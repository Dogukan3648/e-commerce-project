import { Route, Switch } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ShopPage from "../pages/ShopPage";
import SignupPage from "../pages/SignupPage";
import TeamPage from "../pages/TeamPage";

const PageContent = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/product/:id" component={ProductDetailPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/team" component={TeamPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/signup" component={SignupPage} />
    </Switch>
  );
};

export default PageContent;
