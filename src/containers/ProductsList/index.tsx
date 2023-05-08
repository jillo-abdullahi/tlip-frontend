import { products } from "@/products";
import { ItemCard } from "@/components/itemCard";
export const ProductsList: React.FC = () => {
  return (
    <div className="space-y-4">
      {products.map((product) => {
        return (
          <div key={product.id}>
            <ItemCard />
          </div>
        );
      })}
    </div>
  );
};
