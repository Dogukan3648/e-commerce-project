import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import PageContent from "./layout/PageContent";

function App() {
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
