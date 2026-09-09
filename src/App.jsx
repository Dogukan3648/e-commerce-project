import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "./layout/Footer";
import Header from "./layout/Header";
import PageContent from "./layout/PageContent";
import { fetchCategories } from "./store/actions/productActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <Header />

      <main>
        <PageContent />
      </main>

      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
