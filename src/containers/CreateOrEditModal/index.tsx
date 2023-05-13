import { Dispatch, SetStateAction } from "react";
import { initialProductDetails } from "@/utils/constants";
import { Modal } from "@/components/modal";
import { Product, ProgressStatus, NewProduct } from "@/utils/types";
import { CreateModalProgress } from "@/containers/CreateModalProgress";
import { CreateModalFields } from "@/containers/CreateModalFields";

interface CreateOrEditModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  itemCreationOrEditStatus: ProgressStatus | null;
  setItemCreationOrEditStatus: Dispatch<SetStateAction<ProgressStatus | null>>;
  isEditingProduct: boolean;
  setIsEditingProduct: Dispatch<SetStateAction<boolean>>;
  activeProduct: Product | null;
  productDetails: NewProduct;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleCreateProduct: (e: React.FormEvent<HTMLFormElement>) => void;
  handleUpdateProduct: (e: React.FormEvent<HTMLFormElement>) => void;
  discardForm: (e: React.MouseEvent<HTMLButtonElement>) => void;
  updateProduct: (productDetails: NewProduct) => void;
  createNewProduct: (productDetails: NewProduct) => void;
  setProductDetails: Dispatch<SetStateAction<NewProduct>>;
}

export const CreateOrEditModal: React.FC<CreateOrEditModalProps> = ({
  open,
  setOpen,
  itemCreationOrEditStatus,
  isEditingProduct,
  activeProduct,
  productDetails,
  handleCreateProduct,
  handleUpdateProduct,
  discardForm,
  createNewProduct,
  updateProduct,
  setItemCreationOrEditStatus,
  setIsEditingProduct,
  handleInputChange,
  handleDescriptionChange,
  setProductDetails,
}) => {
  // reset form on close
  const closeModal = () => {
    setItemCreationOrEditStatus(null);
    setOpen(false);
    setIsEditingProduct(false);
    setProductDetails(initialProductDetails);
  };

  return (
    <Modal open={open} setOpen={closeModal}>
      {/* default modal state  */}
      {itemCreationOrEditStatus === null && (
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl text-white font-bold">
            {isEditingProduct ? (
              <span>
                Edit <span className="text-blue-200">#</span>
                <span className="text-white uppercase">
                  {activeProduct?.skucode.split("-")[0]}
                </span>
              </span>
            ) : (
              "New Product"
            )}
          </h1>
          <form
            className="flex flex-col space-y-4 mt-8"
            onSubmit={
              isEditingProduct ? handleUpdateProduct : handleCreateProduct
            }
          >
            {/* form fields  */}
            <CreateModalFields
              productDetails={productDetails}
              handleInputChange={handleInputChange}
              handleDescriptionChange={handleDescriptionChange}
            />

            {/* CTAs  */}
            <div className="flex items-center justify-end space-x-4 pt-8">
              <button
                onClick={discardForm}
                className="text-blue-200 underline hover:text-blue-100 transition-all duration-300 ease-in-out"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-500 hover:bg-blue-300 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">
                  {isEditingProduct ? "Save changes" : "Create"}
                </span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* modal states for success, progress and failure  */}
      <CreateModalProgress
        itemCreationOrEditStatus={itemCreationOrEditStatus}
        isEditingProduct={isEditingProduct}
        closeModal={closeModal}
        discardForm={discardForm}
        updateProduct={updateProduct}
        createNewProduct={createNewProduct}
        productDetails={productDetails}
      />
    </Modal>
  );
};
