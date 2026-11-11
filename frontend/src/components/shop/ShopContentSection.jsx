import { useState } from "react";
import ShopFilterBar from "./ShopFilterBar";
import ShopProductsSection from "./ShopProductsSection";

const ShopContentSection = () => {
  const [viewMode, setViewMode] = useState("grid");

  return (
    <>
      <ShopFilterBar viewMode={viewMode} onViewChange={setViewMode} />

      <ShopProductsSection viewMode={viewMode} />
    </>
  );
};

export default ShopContentSection;
