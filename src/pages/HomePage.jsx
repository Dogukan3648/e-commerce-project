import BestSellerSection from "../components/BestSellerSection";
import BlogSection from "../components/BlogSection";
import ClientsSection from "../components/ClientsSection";
import FeaturedProductsSection from "../components/FeaturedProductsSection";
import FeaturesSection from "../components/FeaturesSection";
import HeroSection from "../components/HeroSection";
import ShopCardsSection from "../components/ShopCardsSection";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ClientsSection />
      <ShopCardsSection />
      <BestSellerSection />
      <FeaturedProductsSection />
      <FeaturesSection />
      <BlogSection />
    </>
  );
};

export default HomePage;
