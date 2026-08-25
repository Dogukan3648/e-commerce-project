import BestSellerSection from "../components/home/BestSellerSection";
import BlogSection from "../components/home/blog/BlogSection";
import FeaturedProductsSection from "../components/home/FeaturedProductsSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HeroSection from "../components/home/HeroSection";
import ShopCardsSection from "../components/home/ShopCardsSection";
import ClientsSection from "../components/shared/ClientsSection";

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
