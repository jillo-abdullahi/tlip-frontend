import Image from "next/image";
import { Product } from "@/utils/types";

interface ProductDetailsNavProps {
  fetchProducts: () => void;
  setActiveProduct: (product: Product | null) => void;
}

export const ProductDetailsNav: React.FC<ProductDetailsNavProps> = ({
  fetchProducts,
  setActiveProduct,
}): JSX.Element => {
  return (
    <div className="flex w-full items-center justify-start">
      <button
        className="flex space-x-6 items-center w-fit"
        onClick={() => {
          fetchProducts();
          setActiveProduct(null);
        }}
      >
        <Image
          src="/images/icon-left-carat.svg"
          alt="left"
          width={10}
          height={12}
        />
        <span className="text-blue-200 font-bold">Go back</span>
      </button>
    </div>
  );
};
