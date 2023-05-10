import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Header } from "@/components/header";
import { EmptyState } from "@/components/emptyState";
import { Nav } from "@/components/nav";
import { products } from "@/products";
import { ProductDetails } from "@/containers/ProductDetails";
import { ProductsList } from "@/containers/ProductsList";
import { Location, Custodian } from "@/types";
import { InputField, TextArea } from "@/components/inputs";
import { Modal } from "@/components/modal";
import { ItemDetail } from "@/components/itemDetail";
import { Button, ButtonWithIcon } from "@/components/buttons";
import { EventStatusBadge } from "@/components/eventStatusBadge";
import { EventStatus } from "@/types";

export default function Home() {
  const [productsList, setProductsList] = useState([]);
  const [activeProduct, setActiveProduct] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // product details
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [color, setColor] = useState("");
  const [productLocation, setProductLocation] = useState<Location>({
    city: "",
    country: "",
    state: "",
    address: "",
  });
  const [shelfLife, setShelfLife] = useState(0);
  const [safetyStock, setSafetyStock] = useState(0);
  const [weight, setWeight] = useState(0);

  // change handlers for creating item
  const handleCreateProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductLocation({
      ...productLocation,
      [e.target.id]: e.target.value,
    });
  };

  const handleShelfLifeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShelfLife(parseInt(e.target.value));
  };

  const handleSafetyStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSafetyStock(parseInt(e.target.value));
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(parseInt(e.target.value));
  };

  // const handleCustodianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCustodian({
  //     ...custodian,
  //     [e.target.id]: e.target.value,
  //   });
  // };

  const discardForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCreateModalOpen(false);
  };

  const API_URL = "http://localhost:3000/items";
  // fetch all items to display
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProductsList(data);
      });
  }, []);

  console.log(productsList);

  return (
    <main className="flex relative w-full min-h-screen items-start justify-center">
      <Nav />
      <Head>
        <title key="title">tlip-ui</title>
      </Head>
      <div className="w-full h-full p-24 flex justify-center">
        <div className="w-full max-w-730">
          {/* header section  */}
          {activeProduct == null && (
            <Header setCreateModalOpen={setCreateModalOpen} />
          )}

          {/* list of products */}
          {productsList.length > 0 && activeProduct == null && (
            <div className="mt-14">
              <ProductsList products={productsList} />
            </div>
          )}
          {productsList.length === 0 && (
            <div className="mt-16">
              <EmptyState />
            </div>
          )}
          {activeProduct != null && (
            <div className="flex flex-col space-y-6 w-full">
              {/* product detail nav  */}
              <div className="flex w-full items-center justify-start">
                <button className="flex space-x-6 items-center w-fit">
                  <Image
                    src="/images/icon-left-carat.svg"
                    alt="left"
                    width={10}
                    height={12}
                  />
                  <span className="text-blue-200 font-bold">Go back</span>
                </button>
              </div>

              {/* product details card  */}
              <div className="flex flex-col space-y-4 items-center">
                {/* top action section  */}
                <div className="flex w-full items-center justify-between bg-blue-700 rounded-lg px-8 py-6">
                  <div className="flex items-center justify-start space-x-2">
                    <div className="rounded-full bg-red-300 w-12 h-12"></div>
                    <div className="flex flex-col">
                      <div className="font-bold text-xl">
                        <span className="text-blue-200">#</span>
                        <span className="text-white">898998</span>
                      </div>
                      <div className="text-blue-100">Product 1</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      text="Edit"
                      onClick={() => console.log("clicked")}
                    />
                    <ButtonWithIcon
                      text="Add Event"
                      onClick={() => console.log("clicked")}
                    />
                  </div>
                </div>

                {/* product details card  */}
                <div className="flex flex-col w-full space-y-4 bg-blue-700 rounded-lg px-8 py-6">
                  <div className="font-bold text-blue-500 my-4">
                    Product information
                  </div>
                  {/* description  */}
                  <ItemDetail
                    title="Description"
                    detail="This is a product description that can span multiple lines. This is a product description that can span multiple lines. This is a product description that can span multiple lines. This is a product description that can span multiple lines. This is a product description that can span multiple lines."
                  />

                  <div className="grid grid-cols-4 gap-6">
                    {/* created on  */}
                    <ItemDetail title="Created On" detail="6th July 2024" />
                    {/* price  */}
                    <ItemDetail title="Price" detail="USD 4,000" />
                    {/* weight  */}
                    <ItemDetail title="Weight" detail="4.5kg" />
                    {/* supplier  */}
                    <ItemDetail title="Quantity" detail="400" />
                  </div>

                  {/* events  */}
                  <div className="font-bold text-blue-500 my-4">Events</div>
                  <div className="rounded-lg p-8 w-full bg-blue-600 space-y-4">
                    {/* header titles  */}
                    <div className="grid grid-cols-4 gap-3">
                      <div className="text-sm text-blue-100 font-normal">
                        Created on
                      </div>
                      <div className="text-sm text-blue-100 font-normal">
                        Type
                      </div>
                      <div className="text-sm text-blue-100 font-normal">
                        Custodian
                      </div>
                      <div className="text-sm text-blue-100 font-normal">
                        Status
                      </div>
                    </div>

                    <ProductDetails />

                    {/* event details  */}
                    <div className="divide-y divide-gray-600">
                      <div className="grid grid-cols-10 gap-3 py-2">
                        <div className="text-sm text-white">6th July 2024</div>
                        <div className="text-white">Shipment</div>
                        <div className="text-white">Custodian 1</div>
                        <div className="text-white">
                          <EventStatusBadge eventStatus={EventStatus.Transit} />
                        </div>
                        <div className="text-white">
                          <EventStatusBadge eventStatus={EventStatus.Transit} />
                        </div>
                        <div className="text-white">
                          <EventStatusBadge eventStatus={EventStatus.Transit} />
                        </div>
                        <div className="text-white">
                          <EventStatusBadge eventStatus={EventStatus.Transit} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* product creation modal  */}
        <Modal open={createModalOpen} setOpen={setCreateModalOpen}>
          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl text-white font-bold">New Product</h1>
            <form className="flex flex-col space-y-4 mt-8">
              <div className="flex flex-col space-y-4">
                <div className="font-bold text-blue-500 mt-4">
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

              {/* price, color, and quantity  */}
              <div className="flex items-center justify-start space-x-6 mt-2">
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

                <InputField
                  value={quantity.toString()}
                  handleChange={handleColorChange}
                  id="quantity"
                  label="Quantity"
                  type="number"
                  isRequired={true}
                />
              </div>

              {/* shelf life, safety stock and weight  */}
              <div className="flex items-center justify-start space-x-6 mt-2">
                <InputField
                  value={shelfLife.toString()}
                  handleChange={handleShelfLifeChange}
                  id="shelfLife"
                  label="Shelf life (days)"
                  type="number"
                />

                <InputField
                  value={safetyStock.toString()}
                  handleChange={handleSafetyStockChange}
                  id="safetyStock"
                  label="Safety stock"
                  type="number"
                />

                <InputField
                  value={weight.toString()}
                  handleChange={handleWeightChange}
                  id="weight"
                  label="Weight (kg)"
                  type="number"
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
                    isRequired={true}
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
                  <span className="text-white font-bold text-lg">Create</span>
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </main>
  );
}
