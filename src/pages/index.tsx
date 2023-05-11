import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Header } from "@/components/header";
import { EmptyState } from "@/components/emptyState";
import { Nav } from "@/components/nav";
import { ProductsList } from "@/containers/ProductsList";
import { Location, ProductEvent } from "@/types";
import { InputField, TextArea } from "@/components/inputs";
import { Modal } from "@/components/modal";
import { ItemDetail } from "@/components/itemDetail";
import { Button, ButtonWithIcon } from "@/components/buttons";
import { EventStatusBadge } from "@/components/eventStatusBadge";
import { EventStatus, Product, ProgressStatus } from "@/types";
import { SpinnerIcon } from "@/components/icons/spinner";
import { ErrorIcon } from "@/components/icons/error";
import { SuccessIcon } from "@/components/icons/success";
import { GradientAvatar } from "@/components/gradientAvatar";
import moment from "moment";
import { CreateEventModal } from "@/containers/CreateEventModal";
import { ColumnItem } from "@/components/columnItem";

const BASE_API_URL = "http://localhost:3000";

export default function Home() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [createOrEditModalOpen, setCreateOrEditModalOpen] = useState(false);

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

  // loading progress for create or edit item
  const [itemCreationOrEditStatus, setItemCreationOrEditStatus] =
    useState<ProgressStatus | null>(null);

  // loading progress for fetching products
  const [fetchProductsStatus, setFetchProductsStatus] =
    useState<ProgressStatus | null>(null);

  // progress state to fetch product events for active product
  const [fetchProductEventsStatus, setFetchProductEventsStatus] =
    useState<ProgressStatus | null>(null);
  const [productEvents, setProductEvents] = useState<ProductEvent[]>([]);

  // edit product states
  const [isEditingProduct, setIsEditingProduct] = useState(false);

  // creating new event states
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);

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
          setItemCreationOrEditStatus(ProgressStatus.Failed);
        }
        return response.json();
      })
      .then((data) => {
        setItemCreationOrEditStatus(ProgressStatus.Completed);

        // refetch products
        fetchProducts();
      })
      .catch((error) => {
        setItemCreationOrEditStatus(ProgressStatus.Failed);
      });
  };

  const updateProduct = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const updatedItem = {
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

    console.log(updatedItem);

    fetch(`${BASE_API_URL}/items/${activeProduct?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then((response) => {
        if (!response.ok) {
          setItemCreationOrEditStatus(ProgressStatus.Failed);
        }
        return response.json();
      })
      .then((data) => {
        // in case payload is not valid
        if (data.error) {
          setItemCreationOrEditStatus(ProgressStatus.Failed);
        } else {
          setItemCreationOrEditStatus(ProgressStatus.Completed);

          // refetch products
          fetchProducts(activeProduct?.id);
        }
      })
      .catch((error) => {
        setItemCreationOrEditStatus(ProgressStatus.Failed);
      });
  };

  const fetchProducts = (id?: string): void => {
    let url = `${BASE_API_URL}/items`;
    if (id) {
      url = `${BASE_API_URL}/items/${id}`;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          setFetchProductsStatus(ProgressStatus.Failed);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (id) {
          setActiveProduct(data);
        } else {
          setProductsList(data);
        }
        setFetchProductsStatus(ProgressStatus.Completed);
      })
      .catch((error) => {
        setFetchProductsStatus(ProgressStatus.Failed);
      });

    setFetchProductsStatus(ProgressStatus.InProgress);
  };

  // fetch product events
  const fetchProductEvents = (id: string): void => {
    setFetchProductEventsStatus(ProgressStatus.InProgress);
    fetch(`${BASE_API_URL}/items/${id}/events`)
      .then((response) => {
        if (!response.ok) {
          setFetchProductEventsStatus(ProgressStatus.Failed);
        }
        return response.json();
      })
      .then((data) => {
        setFetchProductEventsStatus(ProgressStatus.Completed);
        setProductEvents(data);
      })
      .catch((error) => {
        setFetchProductEventsStatus(ProgressStatus.Failed);
      });
  };

  const closeCreateModal = (): void => {
    setCreateOrEditModalOpen(false);
    setItemCreationOrEditStatus(null);
    setIsEditingProduct(false);
    clearForm();
  };

  const handleCreateProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setItemCreationOrEditStatus(ProgressStatus.InProgress);
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
    setPrice(parseFloat(e.target.value));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseFloat(e.target.value));
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

  // set field values when editing
  useEffect(() => {
    if (activeProduct != null && createOrEditModalOpen && isEditingProduct) {
      setName(activeProduct.name ?? "");
      setDescription(activeProduct?.description ?? "");
      setPrice((activeProduct?.price && +activeProduct?.price) ?? 0);
      setQuantity(activeProduct.quantity ?? 0);
      setColor(activeProduct.color ?? "");
      setProductLocation({
        city: activeProduct.city ?? "",
        country: activeProduct.country ?? "",
        postalCode: activeProduct.postalcode ?? "",
        address: activeProduct.address ?? "",
      });
      setShelfLife(activeProduct.shelflife ?? 0);
      setSafetyStock(activeProduct.safetystock ?? 0);
    }
  }, [activeProduct, createOrEditModalOpen, isEditingProduct]);

  // fetch product events on active product change
  useEffect(() => {
    if (activeProduct != null) {
      fetchProductEvents(activeProduct.id);
    }
  }, [activeProduct]);

  console.log({ productEvents });

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
                  onClick={() => {
                    fetchProducts();
                    setActiveProduct(null);
                  }}
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
                    <GradientAvatar
                      uuid={activeProduct?.skucode}
                      dimensions="50px"
                    />
                    <div className="flex flex-col">
                      <div className="font-bold text-xl">
                        <span className="text-blue-200">#</span>
                        <span className="text-white uppercase">
                          {activeProduct?.skucode.split("-")[0]}
                        </span>
                      </div>
                      <div className="text-blue-100">{activeProduct?.name}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      text="Edit"
                      onClick={() => {
                        setCreateOrEditModalOpen(true);
                        setIsEditingProduct(true);
                      }}
                    />
                    <ButtonWithIcon
                      text="Add Event"
                      onClick={() => setCreateEventModalOpen(true)}
                    />
                  </div>
                </div>

                {/* product details card  */}
                <div className="flex flex-col w-full space-y-4 bg-blue-700 rounded-lg px-10 py-6">
                  {/* description  */}
                  <div className="pb-4">
                    {activeProduct?.description ? (
                      <ItemDetail
                        title="Description"
                        detail={activeProduct?.description}
                      />
                    ) : null}
                  </div>

                  <div className="grid grid-cols-3 gap-6 pb-4">
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
                      <ItemDetail
                        title="Shelf Life"
                        detail={activeProduct?.shelflife}
                      />
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

                  {/* events  */}
                  <div className="font-bold text-blue-500 my-4">Events</div>
                  {productEvents.length > 0 ? (
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

                      {/* event details  */}
                      <div className="divide-y divide-gray-600">
                        {productEvents.map(
                          ({
                            id,
                            eventtimestamp,
                            eventstatus,
                            eventtype,
                            custodian,
                          }) => {
                            return (
                              <div
                                key={id}
                                className="grid grid-cols-4 gap-3 py-2"
                              >
                                <ColumnItem>
                                  <span className="text-sm text-white font-bold">
                                    {moment(new Date(eventtimestamp)).format(
                                      "MMMM Do, YYYY"
                                    )}
                                  </span>
                                </ColumnItem>
                                <ColumnItem>
                                  <span className="text-white font-bold">
                                    {eventtype}
                                  </span>
                                </ColumnItem>

                                <ColumnItem>
                                  {" "}
                                  <span className="text-white font-bold">
                                    {custodian}
                                  </span>
                                </ColumnItem>
                                <EventStatusBadge eventStatus={eventstatus} />
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-lg p-8 w-full bg-blue-600">
                      <EmptyState
                        subText="There are no events associated with this product"
                        titleText="Nothing here"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal to create event  */}
        <CreateEventModal
          open={createEventModalOpen}
          setOpen={setCreateEventModalOpen}
          activeProduct={activeProduct}
          fetchProductEvents={fetchProductEvents}
        />

        {/* product creation modal  */}
        <Modal open={createOrEditModalOpen} setOpen={closeCreateModal}>
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
                  isEditingProduct ? updateProduct : handleCreateProduct
                }
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
                    defaultValue={activeProduct?.name}
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
                    value={price}
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
                    value={quantity}
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
                onClick={closeCreateModal}
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
                  onClick={isEditingProduct ? updateProduct : createNewProduct}
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
      </div>
    </main>
  );
}
