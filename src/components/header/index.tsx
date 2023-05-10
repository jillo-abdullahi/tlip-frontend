import { ButtonWithIcon } from "@/components/buttons";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  setCreateModalOpen: Dispatch<SetStateAction<boolean>>;
  numberOfProducts: number;
}

export const Header: React.FC<HeaderProps> = ({
  setCreateModalOpen,
  numberOfProducts,
}) => {
  return (
    <header className="flex items-center justify-between w-full">
      <div className="flex flex-col items-start justify-center space-y-1">
        <h1 className="text-3xl text-white font-bold">Products</h1>
        <h2 className="text-sm text-blue-100">
          {numberOfProducts > 0
            ? `There ${
                numberOfProducts === 1 ? "is" : "are"
              } ${numberOfProducts} ${
                numberOfProducts === 1 ? "product" : "total products"
              }`
            : `No products`}
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        <ButtonWithIcon
          text="New Product"
          onClick={() => setCreateModalOpen(true)}
        />
      </div>
    </header>
  );
};
