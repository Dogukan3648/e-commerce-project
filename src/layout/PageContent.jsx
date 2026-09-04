import { Route, Switch } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
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
      <Route path="/contact" component={ContactPage} />
      <Route path="/team" component={TeamPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/login" component={LoginPage} />
      <Route exact path="/cart" component={ShoppingCartPage} />
    </Switch>
  );
};

export default PageContent;
