import { products } from "@/products";
import { ProductCard } from "@/components/productCard";
export const ProductsList: React.FC = () => {
  return (
    <div className="space-y-4">
      {products.map((product) => {
        return (
          <div key={product.id}>
            <ProductCard />
          </div>
        );
      })}
    </div>
  );
};
