import HeaderTopBar from "../components/header/HeaderTopBar";
import Navbar from "../components/header/Navbar";

const Header = () => {
  return (
    <header className="bg-white font-sans text-dark">
      <HeaderTopBar />
      <Navbar />
    </header>
  );
};

export default Header;
