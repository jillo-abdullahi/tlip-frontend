import { ProductCard } from "@/components/productCard";
import { Product } from "@/types";
import { Dispatch, SetStateAction } from "react";
export const ProductsList: React.FC<{
  products: Product[];
  setActiveProduct: Dispatch<SetStateAction<Product | null>>;
}> = ({ products, setActiveProduct }) => {
  return (
    <div className="space-y-2">
      {/* column headers  */}
      <div className="grid grid-cols-6 gap-2 py-2 px-6">
        <div className="col-span-2 text-blue-500">Product name</div>
        <div className="text-blue-500">Reference</div>
        <div className="text-blue-500">Created On</div>
        <div className="text-blue-500">Price</div>
        <div className="text-blue-500 text-left">Quantity</div>
      </div>
      <div className="space-y-4">
        {products.map((product) => {
          return (
            <button key={product.id} onClick={() => setActiveProduct(product)} className="w-full">
              <ProductCard product={product} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
