import { Button, ButtonWithIcon } from "@/components/buttons";
import { GradientAvatar } from "@/components/gradientAvatar";
import { Product } from "@/utils/types";

interface ProductDetailsHeaderProps {
  activeProduct: Product;
  setCreateOrEditModalOpen: (open: boolean) => void;
  setIsEditingProduct: (isEditing: boolean) => void;
  setCreateEventModalOpen: (open: boolean) => void;
}

export const ProductDetailsHeader: React.FC<ProductDetailsHeaderProps> = ({
  activeProduct,
  setCreateOrEditModalOpen,
  setIsEditingProduct,
  setCreateEventModalOpen,
}): JSX.Element => {
  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 w-full items-center justify-between bg-blue-700 rounded-lg px-8 py-6">
      <div className="flex items-center justify-start space-x-2">
        <GradientAvatar uuid={activeProduct?.skucode} dimensions="50px" />
        <div className="flex flex-col">
          <div className="font-bold text-xl">
            <span className="text-blue-200">#</span>
            <span className="text-white uppercase">
              {activeProduct?.skucode.split("-")[0]}
            </span>
          </div>
          <div className="text-blue-100">{activeProduct?.name}</div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <Button
          text="Edit"
          onClick={() => {
            setCreateOrEditModalOpen(true);
            setIsEditingProduct(true);
          }}
        />
        <ButtonWithIcon
          text="Add Event"
          onClick={() => setCreateEventModalOpen(true)}
        />
      </div>
    </div>
  );
};
