# Tomato Food Delivery

A complete MERN stack application for food delivery, featuring Stripe integration for payment processing. The project is deployed using Render for the backend and Vercel for both the client and admin frontend.

## Project Structure

- **backend**: Contains the Express.js server code and Stripe API integration.
- **frontend**: The client-side React application.
- **admin**: The admin panel frontend for managing orders and users.

## Features

- User registration and login
- Food listing and ordering
- Admin panel for managing orders
- Stripe payment integration
- Discount coupons support

## Discount Coupons

- `SAVE25`: ₹25 off
- `SAVE50`: ₹50 off
- `SAVE75`: ₹75 off

## Deployment

The project is deployed online with the following URLs:

- **Client Frontend**: [Tomato Food Delivery - Client](https://tomato-food-delivery-tanmay-312s-projects.vercel.app/)
- **Admin Frontend and Backend**: Link not attached for safety and security purposes.

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Tanmay-312/Tomato-Food-Delivery.git

2. **Navigate to the project directory**:

   ```bash
   cd Tomato-Food-Delivery
   ```

3. **Install dependencies** for each folder:

   - **Backend**:

     ```bash
     cd backend
     npm install
     ```

   - **Frontend**:

     ```bash
     cd frontend
     npm install
     ```

   - **Admin**:

     ```bash
     cd admin
     npm install
     ```

4. **Set up environment variables**:

   Create a `.env` file in the root of each directory (`backend`, `frontend`, `admin`) and add your environment variables. The `.env` file should be configured with the necessary variables for your project.

5. **Run the development servers**:

   - **Backend**:

     ```bash
     cd backend
     npm run server
     ```

   - **Frontend**:

     ```bash
     cd frontend
     npm run dev
     ```

   - **Admin**:

     ```bash
     cd admin
     npm run dev
     ```

## Stripe Integration(UNDER development)

Ensure you have your Stripe API keys set up in the `.env` file of the `backend` directory. Refer to the Stripe documentation for setting up and managing your API keys.

## Contributing

Feel free to fork the repository and submit pull requests with improvements. For any issues or feature requests, please open an issue in the GitHub repository.
