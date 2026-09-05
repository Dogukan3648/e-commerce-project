import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, authChecked } = useSelector((state) => state.client);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (!authChecked) {
          return null;
        }

        if (!user?.email) {
          return <Redirect to="/login" />;
        }

        return <Component {...routeProps} />;
      }}
    ></Route>
  );
};

export default ProtectedRoute;
