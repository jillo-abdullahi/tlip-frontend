import { ItemDetail } from "@/components/itemDetail";
import { Product } from "@/utils/types";
import moment from "moment";

interface ProductDetailsContentProps {
  activeProduct: Product;
}
export const ProductDetailsContent: React.FC<ProductDetailsContentProps> = ({
  activeProduct,
}): JSX.Element => {
  return (
    <>
      <div className="pb-4">
        {activeProduct?.description ? (
          <ItemDetail title="Description" detail={activeProduct?.description} />
        ) : null}
      </div>

      <div className="flex flex-col sm:space-y-0 sm:grid grid-cols-3 gap-6 pb-4">
        {/* created on  */}
        <ItemDetail
          title="Created On"
          detail={moment(new Date(activeProduct?.createdon)).format(
            "MMMM Do, YYYY"
          )}
        />
        {/* price  */}
        {activeProduct?.price ? (
          <ItemDetail
            title="Price (USD)"
            detail={activeProduct?.price.toLocaleString()}
          />
        ) : null}
        {/* color  */}
        {activeProduct?.color ? (
          <ItemDetail title="Color" detail={activeProduct?.color} />
        ) : null}

        {/* Quantity  */}
        {activeProduct?.quantity ? (
          <ItemDetail
            title="Quantity"
            detail={activeProduct?.quantity.toLocaleString()}
          />
        ) : null}

        {/* shelf life  */}
        {activeProduct?.shelflife ? (
          <ItemDetail title="Shelf Life" detail={activeProduct?.shelflife} />
        ) : null}

        {/* safety stock  */}
        {activeProduct?.safetystock ? (
          <ItemDetail
            title="Safety Stock"
            detail={activeProduct?.safetystock.toLocaleString()}
          />
        ) : null}

        {/* location  */}
        {activeProduct?.address ||
        activeProduct?.city ||
        activeProduct?.country ||
        activeProduct?.postalcode ? (
          <ItemDetail
            title="Location"
            detail={
              <span>
                {activeProduct?.address ?? ""} <br />
                {activeProduct?.city ?? ""} <br />
                {activeProduct?.country ?? ""} <br />
                {activeProduct?.postalcode ?? ""}
              </span>
            }
          />
        ) : null}
      </div>
    </>
  );
};
