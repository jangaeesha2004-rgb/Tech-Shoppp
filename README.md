# Tech-Shop (React)

Headphones / earphones shop built with React, plain CSS and React Router.

## Run in VS Code
1. Install Node.js (v18 or newer).
2. Open this folder in VS Code, then open the terminal (Ctrl + `).
3. Run:
   npm install
   npm run dev
4. Open the address shown in the terminal (usually http://localhost:5173).

Build for production: `npm run build`

## Folders
- public/images/products – all product images (paths in the data files start with /images/products/)
- src/data – product, footer, services, filter and review data (the files from your instructor)
- src/context/CartContext.jsx – cart state (saved in localStorage)
- src/components – Navbar, SearchBar, AuthModal, Hero, FeaturedSlider, TopProducts, ProductCard, ProductTabs, RelatedProducts, Services, Footer, ScrollToTopButton, Stars
- src/pages – Home, Products, ProductDetails, Cart
- src/styles – one CSS file per component/page

## Features
Hero slider, featured carousel, category tabs, search with suggestions, login/signup (validated, saved in localStorage),
products page (sort, brand/category filter, price slider), product details (gallery, specifications/overview/reviews, related products),
cart (add, quantity +/-, remove, totals, empty state), footer subscribe form, scroll-to-top button, responsive layout.
