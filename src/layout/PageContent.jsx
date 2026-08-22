import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";

const PageContent = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  );
};

export default PageContent;
