import ClientsSection from "../components/shared/ClientsSection";
import ShopCategoriesSection from "../components/shop/ShopCategoriesSection";
import ShopContentSection from "../components/shop/ShopContentSection";
import ShopHeaderSection from "../components/shop/ShopHeaderSection";

const ShopPage = () => {
  return (
    <>
      <ShopHeaderSection />
      <ShopCategoriesSection />
      <ShopContentSection />
      <ClientsSection />
    </>
  );
};

export default ShopPage;
