import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Header } from "@/components/header";
import { EmptyState } from "@/components/emptyState";
import { Nav } from "@/components/nav";
import { ProductDetails } from "@/containers/ProductDetails";
import { ProductsList } from "@/containers/ProductsList";
import { Location, Custodian } from "@/types";
import { InputField, TextArea } from "@/components/inputs";
import { Modal } from "@/components/modal";
import { ItemDetail } from "@/components/itemDetail";
import { Button, ButtonWithIcon } from "@/components/buttons";
import { EventStatusBadge } from "@/components/eventStatusBadge";
import { EventStatus, Product, ProgressStatus } from "@/types";
import { SpinnerIcon } from "@/components/icons/spinner";
import { ErrorIcon } from "@/components/icons/error";
import { SuccessIcon } from "@/components/icons/success";

const BASE_API_URL = "http://localhost:3000";

export default function Home() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
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
    postalCode: "",
    address: "",
  });
  const [shelfLife, setShelfLife] = useState(0);
  const [safetyStock, setSafetyStock] = useState(0);

  // loading progress for create item
  const [itemCreationStatus, setItemCreationStatus] =
    useState<ProgressStatus | null>(null);

  // loading progress for fetching products
  const [fetchProductsStatus, setFetchProductsStatus] =
    useState<ProgressStatus | null>(null);

  const createNewProduct = (): void => {
    const newItem = {
      name,
      description,
      price,
      quantity,
      color,
      city: productLocation.city,
      country: productLocation.country,
      postalCode: productLocation.postalCode,
      address: productLocation.address,
      shelfLife,
      safetyStock,
    };

    fetch(`${BASE_API_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => {
        if (!response.ok) {
          setItemCreationStatus(ProgressStatus.Failed);
        }
        return response.json();
      })
      .then((data) => {
        setItemCreationStatus(ProgressStatus.Completed);

        // refetch products
        fetchProducts();
      })
      .catch((error) => {
        setItemCreationStatus(ProgressStatus.Failed);
      });
  };

  const fetchProducts = (): void => {
    fetch(`${BASE_API_URL}/items`)
      .then((response) => {
        if (!response.ok) {
          setFetchProductsStatus(ProgressStatus.Failed);
        }
        return response.json();
      })
      .then((data) => {
        setProductsList(data);
        setFetchProductsStatus(ProgressStatus.Completed);
      })
      .catch((error) => {
        setFetchProductsStatus(ProgressStatus.Failed);
      });

    setFetchProductsStatus(ProgressStatus.InProgress);
  };

  const closeCreateModal = (): void => {
    setCreateModalOpen(false);
    setItemCreationStatus(null);
    clearForm();
  };

  console.log({ itemCreationStatus });

  const handleCreateProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setItemCreationStatus(ProgressStatus.InProgress);
    createNewProduct();
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

  // const handleCustodianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCustodian({
  //     ...custodian,
  //     [e.target.id]: e.target.value,
  //   });
  // };
  const clearForm = (): void => {
    setName("");
    setDescription("");
    setPrice(0);
    setQuantity(0);
    setColor("");
    setProductLocation({
      city: "",
      country: "",
      postalCode: "",
      address: "",
    });
    setShelfLife(0);
    setSafetyStock(0);
  };

  const discardForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeCreateModal();
  };

  // fetch all items to display
  useEffect(() => {
    setFetchProductsStatus(ProgressStatus.InProgress);
    fetchProducts();
  }, []);

  return (
    <main className="flex relative w-full min-h-screen items-start justify-center">
      <Nav />
      <Head>
        <title key="title">TLIP</title>
      </Head>
      <div className="w-full h-full p-24 flex justify-center">
        <div className="w-full max-w-730">
          {/* header section  */}
          {activeProduct == null && (
            <Header
              setCreateModalOpen={setCreateModalOpen}
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
            fetchProductsStatus !== ProgressStatus.Failed && (
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

          {/* show details of active product  */}
          {activeProduct != null && (
            <div className="flex flex-col space-y-6 w-full">
              {/* product detail nav  */}
              <div className="flex w-full items-center justify-start">
                <button
                  className="flex space-x-6 items-center w-fit"
                  onClick={() => setActiveProduct(null)}
                >
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
        <Modal open={createModalOpen} setOpen={closeCreateModal}>
          {/* default modal state  */}
          {itemCreationStatus === null && (
            <div className="flex flex-col space-y-4">
              <h1 className="text-2xl text-white font-bold">New Product</h1>
              <form
                className="flex flex-col space-y-4 mt-8"
                onSubmit={handleCreateProduct}
              >
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
                    handleChange={handleQuantityChange}
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
                      value={productLocation?.postalCode}
                      handleChange={handleLocationChange}
                      id="postalCode"
                      label="Postal code"
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
          )}

          {/* success modal state  */}
          {itemCreationStatus === ProgressStatus.Completed && (
            <div className="flex flex-col space-y-8 items-center justify-center">
              <SuccessIcon size={72} />
              <div className="text-blue-100 font-bold text-xl">
                Product created successfully
              </div>
              <button
                className="px-8 py-3 bg-blue-500 hover:bg-blue-300 rounded-full transition-all duration-300 ease-in-out flex items-center justify-center"
                onClick={closeCreateModal}
              >
                <span className="text-white font-bold text-lg">Close</span>
              </button>
            </div>
          )}

          {/* failed modal state  */}
          {itemCreationStatus === ProgressStatus.Failed && (
            <div className="flex flex-col space-y-8 items-center justify-center">
              <ErrorIcon size={72} />
              <div className="text-blue-100 font-bold text-xl">
                We could not create your product
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
                  onClick={createNewProduct}
                >
                  <span className="text-white font-bold text-lg">Retry</span>
                </button>
              </div>
            </div>
          )}

          {/* pending modal state  */}
          {itemCreationStatus === ProgressStatus.InProgress && (
            <div className="flex flex-col space-y-8 items-center justify-center">
              <SpinnerIcon color="#7C5DFA" size={72} />
              <div className="text-blue-100 font-bold text-xl">
                Creating your product
              </div>
            </div>
          )}
        </Modal>
      </div>
    </main>
  );
}
