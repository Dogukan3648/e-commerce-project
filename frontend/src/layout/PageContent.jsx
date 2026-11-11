import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import CreateOrderPage from "../pages/CreateOrderPage";
import FavoritesPage from "../pages/FavoritesPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import PreviousOrdersPage from "../pages/PreviousOrdersPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ShopPage from "../pages/ShopPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import SignupPage from "../pages/SignupPage";
import TeamPage from "../pages/TeamPage";

const PageContent = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />

      <Route exact path="/shop" component={ShopPage} />

      <Route
        exact
        path="/shop/:gender/:categoryName/:categoryId"
        component={ShopPage}
      />

      <Route
        exact
        path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
        component={ProductDetailPage}
      />

      <Route exact path="/contact" component={ContactPage} />
      <Route exact path="/team" component={TeamPage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/login" component={LoginPage} />

      <Route exact path="/cart" component={ShoppingCartPage} />

      <ProtectedRoute exact path="/create-order" component={CreateOrderPage} />

      <ProtectedRoute
        exact
        path="/previous-orders"
        component={PreviousOrdersPage}
      />
      <Route exact path="/favorites" component={FavoritesPage} />

      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default PageContent;
