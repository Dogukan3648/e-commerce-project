import ClientsSection from "../components/shared/ClientsSection";
import ShopCategoriesSection from "../components/shop/ShopCategoriesSection";
import ShopFilterBar from "../components/shop/ShopFilterBar";
import ShopHeaderSection from "../components/shop/ShopHeaderSection";
import ShopProductsSection from "../components/shop/ShopProductsSection";

const ShopPage = () => {
  return (
    <>
      <ShopHeaderSection />
      <ShopCategoriesSection />
      <ShopFilterBar />
      <ShopProductsSection />
      <ClientsSection backgroundClass="bg-light-gray" />
    </>
  );
};

export default ShopPage;
