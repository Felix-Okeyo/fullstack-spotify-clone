# Spotify Clone App

## Overview

This is a 'for-purely-practice' Spotify clone app developed using Next.js, hosted on Vercel, with Supabase as the database backend. The app allows users to create accounts, manage favorites, and simulate a subscription experience using a mock Stripe payment method.

## Features

- **User Authentication:** Users can create accounts and log in securely using Supabase authentication.

- **Favorites:** Users can mark their favorite tracks or albums, and these preferences are stored in the Supabase database.

- **Mock Subscription:** Users can experience a mock subscription feature by inputting the card number `4242 4242 4242` as the payment method. Subscription details can be viewed in the account information.

## Getting Started

### Prerequisites

- Node.js and npm installed
- Supabase account and API key
- Stripe account for handling payments

### Installation

1. Clone the repository

   ```bash
   git clone git@github.com:Felix-Okeyo/fullstack-spotify-clone.git

2. Navigate to the project directory
   
   ```bash
    cd spotify-clone

3. Install dependencies
   
   ```bash
    npm install 

4. Create a .env.local file in the root directory and add the following variables
   
    # Supabase Configuration
    NEXT_PUBLIC_SUPABASE_URL = your-supabase-url

    SUPABASE_SERVICE_ROLE_KEY = your-supabase-secret-key

    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

    # Stripe Configuration
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your-stripe-public-key

    STRIPE_SECRET_KEY=your-stripe-secret-key

    STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

### Running the App
    
    ```bash 
    npm run dev

The app will be accessible at `http://localhost:3000`.

### Deployment 

The app is configured for deployment on Vercel.

    To deploy your own instance, follow these steps:

    1. Set up a project on Vercel.
    2. Add the environment variables mentioned in the .env.local file to your Vercel project settings.
    3. Deploy the app to Vercel.

### Usage 

    1. Create an account or log in.
    2. Explore the app and add your favorite tracks.
    3. Simulate a subscription by using the mock Stripe payment method (4242 4242 4242).
    4. View subscription details in the account information.

These configurations are essential for securely handling payments and processing webhooks.

### Contributing

Contributions are welcome! If you have any ideas for improvements or find any issues, feel free to open an issue or submit a pull request. 

### Usage

    1. Create an account or log in. 
    2. Explore the app and add your favorite tracks.
    3. Add more music to the app.
    3. Simulate a subscription through the acccount route by using the mock Stripe payment method (4242 4242 4242). Add other fields and checkout. This may however log you out of the app. Therefore sign back in and listen to the music therein. 
    4. View subscription details in the account information.

### Technologies Used

    1. Next.js: React framework for building web applications.
    2. TypeScript
    2. Vercel: Cloud platform for deploying serverless functions and static sites.
    3. Supabase: Open-source Firebase alternative with a PostgreSQL database.
    4. Stripe: Payment processing platform for online businesses.

### License

This project is licensed under the [MIT License](https://opensource.org/license/mit/).