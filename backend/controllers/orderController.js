import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order from frontend
const placeOrder = async (req, res) => {

    const URL = process.env.URL;
    console.log(URL);

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            discount: req.body.discount,
            delivery: req.body.delivery
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});

        const line_item = req.body.items.map((item)=>({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
        }))

        line_item.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: req.body.delivery*100
            },
            quantity: 1
        })
        
        const discountCoupon = await stripe.coupons.create({
            amount_off: req.body.discount * 100,
            currency: 'inr',
            duration: 'once',
        });

        const session = await stripe.checkout.sessions.create({
            line_items: line_item,
            mode: 'payment',
            discounts: [{ coupon: discountCoupon.id }],
            success_url: `${URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${URL}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({success:true, session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try {
        if (success) {
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            res.json({success:true, message:"Paid"})
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false, message:"Not paid, failed"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// users orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

// listing orders for admin
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:true, message:"Error"})
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status})
        res.json({success:true, message:"Status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus}