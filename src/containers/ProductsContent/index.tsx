import { Header } from "@/components/header";
import { EmptyState } from "@/components/emptyState";
import { ProductsList } from "@/containers/ProductsList";
import { Product, ProgressStatus } from "@/utils/types";
import SpinnerIcon from "@/components/icons/spinner";
import ErrorIcon from "@/components/icons/error";
import { Dispatch, SetStateAction } from "react";

interface ProductsContentProps {
  setCreateOrEditModalOpen: Dispatch<SetStateAction<boolean>>;
  productsList: Product[];
  activeProduct: Product | null;
  setActiveProduct: Dispatch<SetStateAction<Product | null>>;
  fetchProductsStatus: ProgressStatus | null;
}
export const ProductsContent: React.FC<ProductsContentProps> = ({
  setCreateOrEditModalOpen,
  productsList,
  activeProduct,
  setActiveProduct,
  fetchProductsStatus,
}): JSX.Element => {


  console.log({fetchProductsStatus})
  return (
    <>
      {/* header section  */}
      {activeProduct == null && (
        <Header
          setCreateModalOpen={setCreateOrEditModalOpen}
          numberOfProducts={productsList.length}
        />
      )}

      {/* list of products */}
      {productsList.length > 0 &&
        activeProduct == null &&
        fetchProductsStatus !== ProgressStatus.InProgress && (
          <div className="mt-14">
            <ProductsList
              products={productsList}
              setActiveProduct={setActiveProduct}
            />
          </div>
        )}

      {/* empty state for products list  */}
      {productsList.length === 0 &&
        fetchProductsStatus === ProgressStatus.Completed && (
          <div className="mt-16">
            <EmptyState />
          </div>
        )}

      {/* progress state for fetching items  */}
      {fetchProductsStatus === ProgressStatus.InProgress &&
        activeProduct == null && (
          <div className="mt-16">
            <EmptyState
              icon={<SpinnerIcon color="#7C5DFA" size={100} />}
              subText="Hang on while we find products"
              titleText="Fetching Products"
            />
          </div>
        )}

      {/* error state for fetching items  */}
      {fetchProductsStatus === ProgressStatus.Failed &&
        activeProduct == null && (
          <div className="mt-16">
            <EmptyState
              icon={<ErrorIcon size={100} />}
              subText="Something went wrong while attempting to fetch products"
              titleText="Could not find products"
            />
          </div>
        )}
    </>
  );
};
