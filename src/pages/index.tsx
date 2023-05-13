import { useState, useEffect } from "react";
import Head from "next/head";
import { Nav } from "@/components/nav";
import { Location, ProductEvent } from "@/utils/types";
import { Product, ProgressStatus } from "@/utils/types";
import { CreateEventModal } from "@/containers/CreateEventModal";
import { BASE_API_URL } from "@/utils/constants";
import { CreateOrEditModal } from "@/containers/CreateOrEditModal";
import { ProductDetails } from "@/containers/ProductDetails";
import { ProductsContent } from "@/containers/ProductsContent";

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
    setItemCreationOrEditStatus(ProgressStatus.InProgress);
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

  const updateProduct = (): void => {
    setItemCreationOrEditStatus(ProgressStatus.InProgress);
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
        if (id) {
          setActiveProduct(data);
        } else {
          if (data.error) {
            setProductsList([]);
          } else {
            setProductsList(data);
          }
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
    createNewProduct();
  };

  const handleUpdateProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProduct();
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

  return (
    <main className="flex relative w-full min-h-screen items-start justify-center">
      {/* side/top nav bar  */}
      <Nav />
      <Head>
        <title key="title">TLIP</title>
      </Head>
      <div className="w-full h-full p-24 flex justify-center">
        <div className="w-full max-w-730">
          {/* products list Content  */}
          {activeProduct == null && (
            <ProductsContent
              productsList={productsList}
              activeProduct={activeProduct}
              fetchProductsStatus={fetchProductsStatus}
              setActiveProduct={setActiveProduct}
              setCreateOrEditModalOpen={setCreateOrEditModalOpen}
            />
          )}

          {/* show details of active product  */}
          {activeProduct != null && (
            <ProductDetails
              activeProduct={activeProduct}
              setActiveProduct={setActiveProduct}
              setCreateOrEditModalOpen={setCreateOrEditModalOpen}
              setCreateEventModalOpen={setCreateEventModalOpen}
              setIsEditingProduct={setIsEditingProduct}
              fetchProducts={fetchProducts}
              productEvents={productEvents}
            />
          )}
        </div>
        {/* Modal to create event  */}
        <CreateEventModal
          open={createEventModalOpen}
          setOpen={setCreateEventModalOpen}
          activeProduct={activeProduct}
          fetchProductEvents={fetchProductEvents}
        />

        {/* Modal to create or edit product */}
        <CreateOrEditModal
          open={createOrEditModalOpen}
          setOpen={setCreateOrEditModalOpen}
          isEditingProduct={isEditingProduct}
          activeProduct={activeProduct}
          createNewProduct={createNewProduct}
          updateProduct={updateProduct}
          itemCreationOrEditStatus={itemCreationOrEditStatus}
          name={name}
          description={description}
          price={price}
          color={color}
          quantity={quantity}
          shelfLife={shelfLife}
          safetyStock={safetyStock}
          productLocation={productLocation}
          handleColorChange={handleColorChange}
          handleDescriptionChange={handleDescriptionChange}
          handleNameChange={handleNameChange}
          handlePriceChange={handlePriceChange}
          handleQuantityChange={handleQuantityChange}
          handleSafetyStockChange={handleSafetyStockChange}
          handleShelfLifeChange={handleShelfLifeChange}
          handleLocationChange={handleLocationChange}
          handleCreateProduct={handleCreateProduct}
          handleUpdateProduct={handleUpdateProduct}
          discardForm={discardForm}
        />
      </div>
    </main>
  );
}
