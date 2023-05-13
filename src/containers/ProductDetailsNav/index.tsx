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
        className="flex space-x-4 items-center w-fit group"
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
          className="translate-x-0.5 transform group-hover:translate-x-0 duration-75 ease-in"
        />
        <span className="text-blue-200 font-bold">Go back</span>
      </button>
    </div>
  );
};
