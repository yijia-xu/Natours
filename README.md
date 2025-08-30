# Natours

## A tour booking application built with Node.js

### Overview

Natours is a comprehensive tour booking web application built using Node.js, Express, and MongoDB. It offers a seamless platform for users to explore, book, and manage tours, and provides administrators and guides with robust tools to manage and oversee the platform's operations.

### Key Features

- **User Authentication & Authorization**: Secure sign-up, login, and password management.
- **User Profiles**: Users can update personal information, including username, email, and password.
- **Tour Management**: Admins and lead guides can create, update, and delete tours.
- **Booking System**: Users can book tours, view their bookings, and manage them.
- **Review System**: Users can leave reviews for tours they've experienced.
- **Payment Integration**: Secure payment processing for bookings.
- **Admin Dashboard**: Admins can oversee all user activities, bookings, and reviews.

### Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: Stripe
- **Email Service**: Nodemailer
- **Security**: Helmet, xss-clean, express-mongo-sanitize
- **Utilities**: dotenv, morgan, validator, multer
- **Frontend**: Pug Template Engine
- **Deployment**: Render

### Installation & Setup

**1. Clone the repository**
``git clone https://github.com/yijia-xu/Natours.git` `cd Natours``

**2. Install dependencies**
`npm install`

**3. Set up environment variables**

- Create a `.env` file in the root directory.
- Add the following variables:
  ```
  DATABASE_URI=your_mongo_database_uri
  JWT_SECRET=your_jwt_secret
  JWT_EXPIRES_IN=your_jwt_expiration_time
  JWT_COOKIE_EXPIRES_IN=your_cookie_expiration_time
  STRIPE_SECRET_KEY=your_stripe_secret_key
  EMAIL_HOST=your_email_host
  EMAIL_PORT=your_email_port
  EMAIL_USERNAME=your_email_username
  EMAIL_PASSWORD=your_email_password
  ```

**4. Start the development server**
`npm run dev`

Access the application at `http://localhost:3000`.

### API Documentation

You can explore all API endpoints and test requests via Postman:
[Natours API Documentation](https://yijiaxu.postman.co/workspace/My-Workspace~818ab724-5af1-4e6e-871c-930a0a730259/collection/45629565-2fdace76-b636-4f77-b40e-cbb3b6592c68?action=share&creator=45629565&active-environment=45629565-02aac860-2430-4dc2-acf0-abb4fe447e2c)

### Screenshots
