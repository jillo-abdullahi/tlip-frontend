import { products } from "@/products";
import { ProductCard } from "@/components/productCard";
import { Product } from "@/types";
export const ProductsList: React.FC<{ products: Product[] }> = ({
  products,
}) => {
  return (
    <div className="space-y-2">
      {/* column headers  */}
      <div className="grid grid-cols-6 gap-x-2 p-2">
        <div className="col-span-2 text-blue-500">Product name</div>
        <div className="text-blue-500">Reference</div>
        <div className="text-blue-500">Created On</div>
        <div className="text-blue-500">Price</div>
        <div className="text-blue-500">Weight</div>
      </div>
      <div className="space-y-4">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
