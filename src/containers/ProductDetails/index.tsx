import { Product, ProductEvent } from "@/utils/types";
import { ProductEvents } from "@/containers/ProductEvents";
import { ProductDetailsHeader } from "@/containers/ProductDetailsHeader";
import { ProductDetailsNav } from "@/containers/ProductDetailsNav";
import { ProductDetailsContent } from "@/containers/ProductDetailsContent";

interface ProductDetailsProps {
  activeProduct: Product;
  setActiveProduct: (product: Product | null) => void;
  fetchProducts: () => void;
  setCreateOrEditModalOpen: (open: boolean) => void;
  setIsEditingProduct: (isEditing: boolean) => void;
  setCreateEventModalOpen: (open: boolean) => void;
  productEvents: ProductEvent[];
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  activeProduct,
  setActiveProduct,
  fetchProducts,
  setCreateOrEditModalOpen,
  setIsEditingProduct,
  setCreateEventModalOpen,
  productEvents,
}): JSX.Element => {
  return (
    <div className="flex flex-col space-y-6 w-full">
      {/* product detail nav  */}
      <ProductDetailsNav
        fetchProducts={fetchProducts}
        setActiveProduct={setActiveProduct}
      />

      {/* product details card  */}
      <div className="flex flex-col space-y-4 items-center">
        {/* top action section  */}
        <ProductDetailsHeader
          activeProduct={activeProduct}
          setCreateOrEditModalOpen={setCreateOrEditModalOpen}
          setIsEditingProduct={setIsEditingProduct}
          setCreateEventModalOpen={setCreateEventModalOpen}
        />

        {/* product details card  */}
        <div className="flex flex-col w-full space-y-4 bg-blue-700 rounded-lg px-10 py-6">
          {/* product details  */}
          <ProductDetailsContent activeProduct={activeProduct} />

          {/* events  */}
          <ProductEvents productEvents={productEvents} />
        </div>
      </div>
    </div>
  );
};
