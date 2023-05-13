import { InputField, TextArea } from "@/components/inputs";
import { NewProduct } from "@/utils/types";

interface CreateModalFieldsProps {
  productDetails: NewProduct;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const CreateModalFields: React.FC<CreateModalFieldsProps> = ({
  productDetails,
  handleInputChange,
  handleDescriptionChange,
}) => {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="font-bold text-blue-500 mt-4">Basic information</div>
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
    </>
  );
};
