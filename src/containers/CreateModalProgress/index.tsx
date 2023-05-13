import ErrorIcon from "@/components/icons/error";
import SpinnerIcon from "@/components/icons/spinner";
import SuccessIcon from "@/components/icons/success";
import { NewProduct, ProgressStatus } from "@/utils/types";

interface CreateModalProgressProps {
  itemCreationOrEditStatus: ProgressStatus | null;
  isEditingProduct: boolean;
  closeModal: () => void;
  discardForm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  updateProduct: (productDetails: NewProduct) => void;
  createNewProduct: (productDetails: NewProduct) => void;
  productDetails: NewProduct;
}

export const CreateModalProgress: React.FC<CreateModalProgressProps> = ({
  itemCreationOrEditStatus,
  isEditingProduct,
  closeModal,
  discardForm,
  updateProduct,
  createNewProduct,
  productDetails,
}): JSX.Element => {
  return (
    <>
      {itemCreationOrEditStatus === ProgressStatus.Completed && (
        <div className="flex flex-col space-y-8 items-center justify-center">
          <SuccessIcon size={72} />
          <div className="text-blue-100 font-bold text-xl">
            {isEditingProduct
              ? "Changes successfully saved"
              : "Product created successfully"}
          </div>
          <button
            className="px-8 py-3 bg-blue-500 hover:bg-blue-300 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center"
            onClick={closeModal}
          >
            <span className="text-white font-bold text-lg">Close</span>
          </button>
        </div>
      )}

      {/* failed modal state  */}
      {itemCreationOrEditStatus === ProgressStatus.Failed && (
        <div className="flex flex-col space-y-8 items-center justify-center">
          <ErrorIcon size={72} />
          <div className="text-blue-100 font-bold text-xl">
            {isEditingProduct
              ? "We could not save your changes"
              : "We could not create your product"}
          </div>
          <div className="flex items-center justify-end space-x-4">
            <button
              onClick={discardForm}
              className="text-blue-200 underline hover:text-blue-100 transition-all duration-300 ease-in-out"
            >
              Cancel
            </button>
            <button
              className="px-8 py-3 bg-blue-500 hover:bg-blue-300 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center"
              onClick={
                isEditingProduct
                  ? () => updateProduct(productDetails)
                  : () => createNewProduct(productDetails)
              }
            >
              <span className="text-white font-bold text-lg">Retry</span>
            </button>
          </div>
        </div>
      )}

      {/* pending modal state  */}
      {itemCreationOrEditStatus === ProgressStatus.InProgress && (
        <div className="flex flex-col space-y-8 items-center justify-center">
          <SpinnerIcon color="#7C5DFA" size={72} />
          <div className="text-blue-100 font-bold text-xl">
            {isEditingProduct
              ? "Applying your changes"
              : "Creating your product"}
          </div>
        </div>
      )}
    </>
  );
};
