FitFuel 🥗📱

FitFuel is a mobile nutrition tracking app built with React Native and Expo. It allows users to search foods, log meals by serving size, and track daily calorie intake using real-time nutrition data from public REST APIs.

This project was created with create-expo-app
.

Get started
1. Install dependencies
npm install

2. Start the app
npx expo start


In the output, you'll find options to open the app in a:

Development build

Android emulator

iOS simulator

Expo Go — a lightweight sandbox for testing the app on your phone

App Features

🔍 Food Search — Fetches live nutrition data from REST APIs

🍽️ Meal Logging — Log foods by customizable serving size (grams)

📊 Daily Calorie Tracking — Automatically calculates total daily calories

📈 Progress Tracking — Visual indicator for progress toward a daily calorie goal

📱 Mobile-First UI — Clean, responsive design built for mobile devices

Project Structure

You can start developing by editing the files inside the app directory.
This project uses file-based routing provided by Expo Router.

app/
├── (tabs)/        # Main app screens
├── components/    # Reusable UI components
├── assets/        # Images and static files
└── index.js       # Entry point

Tech Stack

Framework: React Native (Expo)

Language: JavaScript

APIs: REST APIs for nutrition data

Tools: Git, Visual Studio Code, Expo CLI

What I Learned

Building mobile applications with React Native and Expo

Integrating and consuming REST APIs

Managing state and user input with React hooks

Implementing dynamic calculations for serving sizes and calories

Designing intuitive, mobile-first user interfaces
