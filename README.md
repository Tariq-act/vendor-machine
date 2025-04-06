# 🥤 Vending Machine Simulator

A simple vending machine simulator built with **React** using **Context API** for state management.

## 🚀 Features

- Browse and select from a list of products (Chips, Soda, Chocolate, etc.)
- Insert money using accepted denominations: 1, 2, 5, 10, 20, 50, 100
- Automatically purchases item if enough money is inserted
- Returns extra change in the fewest coins/bills
- Cancel a transaction and refund inserted money
- Tracks selected item and inserted amount globally

## 📁 Project Structure

```
src/
│
├── public/         # Images or mock JSON data
├── components/     # Reusable components
├── context.jsx     # Context API for global state
├── utils/          # Utility functions
└── App.jsx         # Main app logic
```

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Tariq-act/vendor-machine.git
cd vending-machine-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app locally

```bash
npm run dev
```

The app will run on `http://localhost:5173`.

## ⚠️ Notes

- Make sure `data.json` (product list) is placed inside the `public/` folder for correct fetch during production/deployment (especially on Vercel).
- Refund option is only available **before** the item is purchased.

---
