import { ButtonWithIcon } from "@/components/buttons";

export const Header: React.FC = () => {
  //todo: update with actual number of product items
  const products = [];

  return (
    <header className="flex items-center justify-between w-full">
      <div className="flex flex-col items-start justify-center space-y-1">
        <h1 className="text-3xl text-white font-bold">Products</h1>
        <h2 className="text-sm text-blue-100">
          {products.length
            ? `There are ${products.length} total product`
            : `No products`}
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        <ButtonWithIcon
          text="New Product"
          onClick={() => console.log("clicked")}
        />
      </div>
    </header>
  );
};
