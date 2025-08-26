# My-Store-

A mini e-commerce web app built with React, React Router, and Redux Toolkit. Features product listing, search, categories, product detail, cart, and checkout flow with form validation, caching, and responsive design using the Fake Store API.

---

## Features

- **Product Listing:** Browse products fetched from the Fake Store API.
- **Categories & Search:** Filter products by category and search by name.
- **Product Details:** View detailed information about each product.
- **Shopping Cart:** Add, remove, and update products in your cart.
- **Checkout Flow:** Complete your purchase with form validation.
- **Caching:** Efficient data fetching and caching for fast performance.
- **Responsive Design:** Optimized for all device sizes.

---

## Tech Stack

- **Frontend:** [React](https://react.dev/)
- **Routing:** [React Router](https://reactrouter.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **TypeScript:** Static typing for maintainable code

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

```bash
git clone https://github.com/palaklohade/My-Store-.git
cd My-Store-
npm install
```

### Running the App

```bash
npm start
```

The app will start on `http://localhost:3000`.

---

## Folder Structure

```
src/
  components/       // Reusable UI components
  features/         // Redux slices & features (cart, products, etc.)
  pages/            // Main pages (Home, ProductDetail, Cart, Checkout)
  api/              // API utilities and services
  App.tsx           // Application root
  index.tsx         // Entry point
```

---

## API

- Uses [Fake Store API](https://fakestoreapi.com/) for products, categories, and details.

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add your feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request


---

## Author

Made by [palaklohade](https://github.com/palaklohade)

---

