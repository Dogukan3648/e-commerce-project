import HeaderTopBar from "../components/HeaderTopBar";
import Navbar from "../components/Navbar";

const Header = () => {
  return (
    <header className="bg-white font-sans text-dark">
      <HeaderTopBar />
      <Navbar />
    </header>
  );
};

export default Header;
