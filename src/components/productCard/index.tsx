import moment from "moment";
import { ColumnItem } from "@/components/columnItem";
import { Product } from "@/types";
import { GradientAvatar } from "@/components/gradientAvatar";

export const ProductCard: React.FC<{
  product: Product;
}> = ({ product }) => {
  const { id, name, skucode, price, weight, createdon, quantity } = product;
  const creationDate = moment(new Date(createdon)).format("MMMM Do, YYYY");

  return (
    <div className="w-full border border-transparent bg-blue-700 grid grid-cols-6 gap-2 p-6 rounded-xl hover:border-blue-300">
      {/* avatar and product name  */}
      <div className="flex items-center justify-start space-x-3 col-span-2">
        <div className="flex items-center justify-start">
          <GradientAvatar uuid={skucode} dimensions="40px" />
        </div>
        <div className="text-white text-left">{name}</div>
      </div>

      {/* product id  */}
      <ColumnItem>
        <div className="flex items-center justify-start font-bold">
          <span className="text-blue-200">#</span>
          <span className="text-white uppercase">{skucode.split("-")[0]}</span>
        </div>
      </ColumnItem>

      {/* created on  */}
      <ColumnItem>
        <span className="text-blue-100">{creationDate}</span>
      </ColumnItem>

      {/* price in usd  */}
      <ColumnItem>
        <div className="flex items-center justify-start space-x-1 font-bold">
          <span className="text-blue-200 text-sm">USD</span>
          <span className="text-white font-bold">
            {price ? price.toLocaleString() : "-"}
          </span>
        </div>
      </ColumnItem>

      {/* weight  */}
      <ColumnItem>
        <span className="text-blue-100 font-bold">
          {quantity ? `${quantity.toLocaleString()}` : "-"}
        </span>
      </ColumnItem>
    </div>
  );
};
