# Bandage E-Commerce

A responsive e-commerce web application built with React, Redux, Tailwind CSS, and REST API integration.

Bandage provides a complete shopping experience including product discovery, category navigation, authentication, favorites, shopping cart management, checkout, address and card management, order creation, and previous order history.

## Live Demo

https://e-commerce-project-eta-olive.vercel.app

## Repository

https://github.com/Dogukan3648/e-commerce-project

## Features

- Responsive mobile and desktop interface
- Product listing and category-based navigation
- Product search and filtering
- Sorting by price and rating
- Responsive pagination
- Product detail pages
- Favorites management
- Shopping cart with quantity controls
- Product selection before checkout
- User registration and login
- Remember Me functionality
- Automatic token verification
- Protected routes
- Logout flow
- Gravatar-based user avatar
- Shipping and billing address management
- Saved credit card management
- Two-step checkout flow
- Order creation
- Previous order history
- Loading, error, and empty states
- Toast notifications
- Custom 404 page

## Tech Stack

### Frontend

- React
- JavaScript
- Vite
- Tailwind CSS
- React Router DOM v5

### State Management

- Redux
- React Redux
- Redux Thunk
- Redux Logger

### Forms & Validation

- React Hook Form

### API & UI

- Axios
- React Toastify
- Lucide React

## Application Architecture

The project follows a component-based architecture with separate layers for API communication, reusable components, page-level components, application state, and utility functions.

```text
src/
├── api/
├── assets/
├── components/
├── data/
├── layout/
├── pages/
├── store/
└── utils/
```

Global application state is managed with Redux, while asynchronous operations are handled with Redux Thunk.

The main state domains include:

- Client
- Products
- Shopping Cart
- Favorites

Redux Logger is enabled only during development.

## Authentication

The application includes token-based authentication.

Authentication features include:

- User registration
- User login
- Remember Me support
- Automatic token verification on application startup
- Axios Authorization header configuration
- Redirecting users back to their previous page after login
- Protected checkout routes
- Protected previous orders route
- Logout functionality
- Cleanup of user-specific address and card state after logout

## Product Experience

Users can:

1. Browse products
2. Navigate through product categories
3. Search products
4. Filter product results
5. Sort products by price or rating
6. Navigate through paginated results
7. View individual product details
8. Add products to favorites
9. Add products to the shopping cart
10. Select which products should be included in checkout

Product requests support category, filtering, sorting, and pagination parameters.

## Shopping Cart

The shopping cart supports:

- Adding products
- Increasing product quantities
- Decreasing product quantities
- Removing products
- Preventing quantities from exceeding available stock
- Selecting or deselecting products for checkout
- Dynamic total calculation
- Disabling checkout when no products are selected

## Checkout

Checkout is implemented as a two-step flow.

### Address Step

Users can:

- Add a new address
- Edit an existing address
- Delete an address
- Select a shipping address
- Use the shipping address as the billing address
- Select a separate billing address

### Payment Step

Users can:

- Add a new credit card
- Select a saved credit card
- Edit saved cards
- Delete saved cards
- Enter CVV information
- Review the order total
- Complete the order

After a successful order:

- The shopping cart is cleared
- Checkout-related state is reset
- A success notification is displayed

## Order History

Authenticated users can access their previous orders.

Order information includes:

- Order number
- Order date
- Total price
- Masked card information
- Ordered products
- Product quantities
- Product prices

Order details can be expanded to view additional information.

## Routing

The main application routes include:

```text
/
/shop
/shop/:gender/:categoryName/:categoryId
/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId
/about
/contact
/team
/signup
/login
/cart
/favorites
/create-order
/previous-orders
```

The following routes are protected:

```text
/create-order
/previous-orders
```

Unauthenticated users attempting to access protected routes are redirected to the login page.

## API Integration

The application communicates with a REST API through a centralized Axios instance.

Main API operations include:

```text
POST   /login
GET    /verify

GET    /roles
GET    /categories

GET    /products
GET    /products/:id

GET    /user/address
POST   /user/address
PUT    /user/address
DELETE /user/address/:id

GET    /user/card
POST   /user/card
PUT    /user/card
DELETE /user/card/:id

POST   /order
GET    /order
```

## Environment Variables

Create a `.env` file in the project root and define the API base URL:

```env
VITE_API_BASE_URL=YOUR_API_BASE_URL
```

## Installation

Clone the repository:

```bash
git clone https://github.com/Dogukan3648/e-commerce-project.git
```

Navigate to the project directory:

```bash
cd e-commerce-project
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=YOUR_API_BASE_URL
```

Start the development server:

```bash
npm run dev
```

## Available Scripts

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run the linter:

```bash
npm run lint
```

## Design

The user interface was implemented from a provided Figma e-commerce design.

The project follows a responsive, mobile-first approach while converting the design into reusable React components.

The application includes dedicated responsive designs for pages such as:

- Home
- Shop
- Product Detail
- About
- Contact
- Team
- Shopping Cart
- Checkout

## Key Engineering Decisions

- Shared application state is managed with Redux.
- Asynchronous API operations are handled with Redux Thunk.
- API communication is centralized through an Axios instance.
- Redux Logger is limited to the development environment.
- Authentication is verified before protected content is rendered.
- Reusable components are preferred over duplicated page-specific implementations.
- Product requests preserve filtering, sorting, category, and pagination parameters.
- Favorites are persisted in local storage.
- User-specific address and card data are cleared during logout.
- Shopping cart state is intentionally preserved after logout.
- Checkout cannot continue without at least one selected cart item.
- Product quantities cannot exceed available stock.

## Future Improvements

Possible future improvements include:

- Shopping cart persistence between browser sessions
- Centralized API error handling
- Automated unit tests
- Integration tests
- End-to-end checkout tests
- Additional account management features
- Product variation support
- Additional payment options

## Author

**Doğukan Bozkır**

Computer Engineer / Full Stack Developer

- GitHub: https://github.com/Dogukan3648
- LinkedIn: https://www.linkedin.com/in/dogukanbozkir/

---

Built as a full-featured frontend e-commerce project focused on responsive UI development, state management, authentication, REST API integration, and real-world shopping flows.
