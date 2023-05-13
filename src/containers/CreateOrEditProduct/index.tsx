import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ProgressStatus } from "@/utils/types";
import { CreateOrEditModal } from "@/containers/CreateOrEditModal";
import { Product, NewProduct } from "@/utils/types";
import { initialProductDetails } from "@/utils/constants";

interface CreateOrEditProductProps {
  activeProduct: Product | null;
  setCreateOrEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setItemCreationOrEditStatus: Dispatch<SetStateAction<ProgressStatus | null>>;
  setIsEditingProduct: Dispatch<SetStateAction<boolean>>;
  createNewProduct: (productDetails: NewProduct) => void;
  updateProduct: (productDetails: NewProduct) => void;
  fetchProductEvents: (id: string) => void;
  createOrEditModalOpen: boolean;
  isEditingProduct: boolean;
  itemCreationOrEditStatus: ProgressStatus | null;
}

export const CreateOrEditProduct: React.FC<CreateOrEditProductProps> = ({
  activeProduct,
  setCreateOrEditModalOpen,
  setItemCreationOrEditStatus,
  setIsEditingProduct,
  createNewProduct,
  updateProduct,
  fetchProductEvents,
  createOrEditModalOpen,
  isEditingProduct,
  itemCreationOrEditStatus,
}): JSX.Element => {
  const [productDetails, setProductDetails] = useState<NewProduct>(
    initialProductDetails
  );

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProductDetails({
      ...productDetails,
      description: e.target.value,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    setProductDetails({
      ...productDetails,
      [id]:
        id === "quantity" ||
        id === "price" ||
        id === "shelfLife" ||
        id === "safetyStock"
          ? parseFloat(e.target.value)
          : e.target.value,
    });
  };

  const clearForm = (): void => {
    setProductDetails(initialProductDetails);
  };

  const discardForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCreateOrEditModalOpen(false);
    setItemCreationOrEditStatus(null);
    setIsEditingProduct(false);
    clearForm();
  };

  const handleCreateProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createNewProduct(productDetails);
  };

  const handleUpdateProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProduct(productDetails);
  };

  // set field values when editing
  useEffect(() => {
    if (activeProduct != null && createOrEditModalOpen && isEditingProduct) {
      setProductDetails((prevState) => ({
        ...prevState,
        name: activeProduct.name ?? "",
        description: activeProduct.description ?? "",
        price: activeProduct.price ? +activeProduct.price : 0,
        quantity: activeProduct.quantity ?? 0,
        color: activeProduct.color ?? "",
        shelfLife: activeProduct.shelflife ?? 0,
        safetyStock: activeProduct.safetystock ?? 0,
        city: activeProduct.city ?? "",
        country: activeProduct.country ?? "",
        postalCode: activeProduct.postalcode ?? "",
        address: activeProduct.address ?? "",
      }));
    }
  }, [activeProduct, createOrEditModalOpen, isEditingProduct]);

  // fetch product events on active product change
  useEffect(() => {
    if (activeProduct != null) {
      fetchProductEvents(activeProduct.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeProduct]);

  return (
    <CreateOrEditModal
      open={createOrEditModalOpen}
      setOpen={setCreateOrEditModalOpen}
      isEditingProduct={isEditingProduct}
      setIsEditingProduct={setIsEditingProduct}
      activeProduct={activeProduct}
      createNewProduct={createNewProduct}
      updateProduct={updateProduct}
      itemCreationOrEditStatus={itemCreationOrEditStatus}
      productDetails={productDetails}
      handleDescriptionChange={handleDescriptionChange}
      handleInputChange={handleInputChange}
      handleCreateProduct={handleCreateProduct}
      handleUpdateProduct={handleUpdateProduct}
      discardForm={discardForm}
      setItemCreationOrEditStatus={setItemCreationOrEditStatus}
      setProductDetails={setProductDetails}
    />
  );
};
