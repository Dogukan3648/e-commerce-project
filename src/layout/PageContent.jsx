import { Route, Switch } from "react-router-dom";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ShopPage from "../pages/ShopPage";

const PageContent = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/shop" component={ShopPage} />
      <Route path="/product/:id" component={ProductDetailPage} />
      <Route path="/contact" component={ContactPage} />
    </Switch>
  );
};

export default PageContent;
