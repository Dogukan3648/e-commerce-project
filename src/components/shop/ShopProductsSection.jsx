import { shopProducts } from "../../data/shop/shopProducts";
import ShopPagination from "./ShopPagination";
import ShopProductCard from "./ShopProductCard";

const ShopProductsSection = () => {
  const mobileProducts = [
    shopProducts[0],
    shopProducts[1],
    shopProducts[2],
    shopProducts[3],
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto flex flex-col items-center gap-12 py-20 lg:w-[1124px] lg:py-12">
        <div className="flex flex-col items-center gap-[30px] lg:hidden">
          {mobileProducts.map((product, index) => (
            <ShopProductCard
              key={`${product.id}-${index}`}
              image={product.image}
            />
          ))}
        </div>

        <div className="hidden w-[1050px] flex-wrap gap-x-[30px] gap-y-12 lg:flex">
          {shopProducts.map((product) => (
            <ShopProductCard key={product.id} image={product.image} />
          ))}
        </div>

        <ShopPagination />
      </div>
    </section>
  );
};

export default ShopProductsSection;
