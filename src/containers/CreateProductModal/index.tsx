import { Modal } from "@/components/modal";
import { InputField, TextArea } from "@/components/inputs";
import { Dispatch, SetStateAction } from "react";
import { Location, Custodian } from "@/types";
import { Button } from "@/components/buttons";

interface CreateProductModalProps {
  createModalOpen: boolean;
  setCreateModalOpen: Dispatch<SetStateAction<boolean>>;

  // product details
  name: string;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description: string;
  handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  price: number;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color: string;
  handleColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  productLocation: Location;
  handleLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  custodian: Custodian;
  handleCustodianChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const CreateProductModal: React.FC<CreateProductModalProps> = ({
  createModalOpen,
  setCreateModalOpen,

  // product details
  name,
  handleNameChange,
  description,
  handleDescriptionChange,
  price,
  handlePriceChange,
  color,
  handleColorChange,
  productLocation,
  handleLocationChange,
  custodian,
  handleCustodianChange,
}) => {
  const discardForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCreateModalOpen(false);
  };
  return (
    <Modal open={createModalOpen} setOpen={setCreateModalOpen}>
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl text-white font-bold mb-8">New Product</h1>
        <form className="flex flex-col space-y-4 mt-8">
          <div className="flex flex-col space-y-4">
            <div className="font-bold text-blue-500 mt-8">
              Basic information
            </div>
            {/* name  */}
            <InputField
              value={name}
              handleChange={handleNameChange}
              id="name"
              label="Name"
              isRequired={true}
            />

            {/* description  */}
            <TextArea
              value={description}
              handleChange={handleDescriptionChange}
              id="description"
              label="Description"
            />
          </div>

          {/* price and color  */}
          <div className="flex items-center justify-start space-x-6 mt-2">
            {/* price  */}
            <InputField
              value={price.toString()}
              handleChange={handlePriceChange}
              id="price"
              label="Price (USD)"
              isRequired={true}
              type="number"
            />

            <InputField
              value={color}
              handleChange={handleColorChange}
              id="color"
              label="Color"
            />
          </div>

          {/* location  */}
          <div className="flex flex-col space-y-4">
            <div className="font-bold text-blue-500 mt-8">Location</div>
            <InputField
              value={productLocation?.address}
              handleChange={handleLocationChange}
              id="address"
              label="Street address"
              isRequired={true}
            />
            <div className="flex items-center justify-start space-x-4">
              <InputField
                value={productLocation?.city}
                handleChange={handleLocationChange}
                id="city"
                label="City"
              />

              <InputField
                value={productLocation?.state}
                handleChange={handleLocationChange}
                id="state"
                label="State"
              />
              <InputField
                value={productLocation?.country}
                handleChange={handleLocationChange}
                id="country"
                label="Country"
              />
            </div>
          </div>

          {/* custodian  */}
          <div className="flex flex-col space-y-4">
            <div className="font-bold text-blue-500 mt-8">Custodian</div>
            <InputField
              value={custodian?.name}
              handleChange={handleCustodianChange}
              id="name"
              label="Name"
              isRequired={true}
            />
            <InputField
              value={custodian?.address}
              handleChange={handleCustodianChange}
              id="address"
              label="Street address"
            />

            <div className="flex items-center justify-start space-x-4">
              <InputField
                value={custodian?.email}
                handleChange={handleCustodianChange}
                id="email"
                label="Email"
                isRequired={true}
                type="email"
              />
              <InputField
                value={custodian?.phone}
                handleChange={handleCustodianChange}
                id="phone"
                label="Phone"
                type="tel"
              />
            </div>
          </div>

          {/* CTAs  */}
          <div className="flex items-center justify-end space-x-4 mt-8">
            <button
              onClick={discardForm}
              className="text-blue-200 underline hover:text-blue-300 transition-all duration-300 ease-in-out"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-8 py-4 bg-blue-500 hover:bg-blue-300 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">Create</span>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
