import { Dispatch, SetStateAction } from "react";
import { initialProductDetails } from "@/utils/constants";
import { Modal } from "@/components/modal";
import ErrorIcon from "@/components/icons/error";
import { InputField, TextArea } from "@/components/inputs";
import { Product, ProgressStatus, NewProduct } from "@/utils/types";
import SuccessIcon from "@/components/icons/success";
import SpinnerIcon from "@/components/icons/spinner";

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
    <Modal open={open} setOpen={setOpen}>
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
            <div className="flex flex-col space-y-4">
              <div className="font-bold text-blue-500 mt-4">
                Basic information
              </div>
              {/* name  */}
              <InputField
                value={productDetails?.name ?? ""}
                handleChange={handleInputChange}
                id="name"
                label="Name"
                isRequired={true}
              />

              {/* description  */}
              <TextArea
                value={productDetails?.description ?? ""}
                handleChange={handleDescriptionChange}
                id="description"
                label="Description"
              />
            </div>

            {/* price, color, and quantity  */}
            <div className="flex items-center justify-start space-x-6 mt-2">
              <InputField
                value={productDetails?.price?.toString() ?? "0"}
                handleChange={handleInputChange}
                id="price"
                label="Price (USD)"
                isRequired={true}
                type="number"
              />

              <InputField
                value={productDetails?.color ?? ""}
                handleChange={handleInputChange}
                id="color"
                label="Color"
              />

              <InputField
                value={productDetails?.quantity?.toString() ?? "0"}
                handleChange={handleInputChange}
                id="quantity"
                label="Quantity"
                type="number"
                isRequired={true}
              />
            </div>

            {/* shelf life, safety stock and weight  */}
            <div className="flex items-center justify-start space-x-6 mt-2">
              <InputField
                value={productDetails?.shelfLife?.toString() ?? "0"}
                handleChange={handleInputChange}
                id="shelfLife"
                label="Shelf life (days)"
                type="number"
              />

              <InputField
                value={productDetails?.safetyStock?.toString() ?? "0"}
                handleChange={handleInputChange}
                id="safetyStock"
                label="Safety stock"
                type="number"
              />
            </div>

            {/* location  */}
            <div className="flex flex-col space-y-4">
              <div className="font-bold text-blue-500 mt-8">Location</div>
              <InputField
                value={productDetails?.address ?? ""}
                handleChange={handleInputChange}
                id="address"
                label="Street address"
                isRequired={true}
              />
              <div className="flex items-center justify-start space-x-4">
                <InputField
                  value={productDetails?.city ?? ""}
                  handleChange={handleInputChange}
                  id="city"
                  label="City"
                  isRequired={true}
                />

                <InputField
                  value={productDetails?.postalCode ?? ""}
                  handleChange={handleInputChange}
                  id="postalCode"
                  label="Postal code"
                />
                <InputField
                  value={productDetails?.country ?? ""}
                  handleChange={handleInputChange}
                  id="country"
                  label="Country"
                />
              </div>
            </div>

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

      {/* success modal state  */}
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
    </Modal>
  );
};
