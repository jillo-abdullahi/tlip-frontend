import { useState, useEffect } from "react";
import Head from "next/head";
import { Nav } from "@/components/nav";
import { ProductEvent, NewProduct } from "@/utils/types";
import { Product, ProgressStatus } from "@/utils/types";
import { CreateEventModal } from "@/containers/CreateEventModal";
import { BASE_API_URL } from "@/utils/constants";
import { ProductDetails } from "@/containers/ProductDetails";
import { ProductsContent } from "@/containers/ProductsContent";
import { CreateOrEditProduct } from "@/containers/CreateOrEditProduct";

export default function Home() {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [productEvents, setProductEvents] = useState<ProductEvent[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [createOrEditModalOpen, setCreateOrEditModalOpen] = useState(false);

  // loading progress for create or edit item
  const [itemCreationOrEditStatus, setItemCreationOrEditStatus] =
    useState<ProgressStatus | null>(null);

  // loading progress for fetching products
  const [fetchProductsStatus, setFetchProductsStatus] =
    useState<ProgressStatus | null>(null);

  // progress state to fetch product events for active product
  const [fetchProductEventsStatus, setFetchProductEventsStatus] =
    useState<ProgressStatus | null>(null);

  // edit product states
  const [isEditingProduct, setIsEditingProduct] = useState(false);

  // creating new event states
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);

  // create new product
  const createNewProduct = async (
    productDetails: NewProduct
  ): Promise<void> => {
    setItemCreationOrEditStatus(ProgressStatus.InProgress);

    const response = await fetch(`${BASE_API_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productDetails),
    });

    if (!response.ok) {
      setItemCreationOrEditStatus(ProgressStatus.Failed);
    } else {
      setItemCreationOrEditStatus(ProgressStatus.Completed);
      // refetch products
      fetchProducts();
    }
  };

  // update product
  const updateProduct = async (productDetails: NewProduct): Promise<void> => {
    setItemCreationOrEditStatus(ProgressStatus.InProgress);

    const response = await fetch(`${BASE_API_URL}/items/${activeProduct?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productDetails),
    });

    if (!response.ok) {
      setItemCreationOrEditStatus(ProgressStatus.Failed);
    } else {
      setItemCreationOrEditStatus(ProgressStatus.Completed);
      // refetch product details
      fetchProducts(activeProduct?.id);
    }
  };

  // get products list
  const fetchProducts = async (id?: string): Promise<void> => {
    let url = `${BASE_API_URL}/items`;
    if (id) {
      url = `${BASE_API_URL}/items/${id}`;
    }
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      id ? setActiveProduct(result) : setProductsList(result);
      setFetchProductsStatus(ProgressStatus.Completed);
    } else if (response.status === 404) {
      setProductsList([]);
      setFetchProductsStatus(ProgressStatus.Completed);
    } else {
      setFetchProductsStatus(ProgressStatus.Failed);
    }
  };

  // fetch product events
  const fetchProductEvents = async (id: string): Promise<void> => {
    setFetchProductEventsStatus(ProgressStatus.InProgress);
    const response = await fetch(`${BASE_API_URL}/items/${id}/events`);

    if (!response.ok) {
      setFetchProductEventsStatus(ProgressStatus.Failed);
    } else {
      const result = await response.json();
      setProductEvents(result);
      setFetchProductEventsStatus(ProgressStatus.Completed);
    }
  };

  // fetch all items to display
  useEffect(() => {
    setFetchProductsStatus(ProgressStatus.InProgress);
    fetchProducts();
  }, []);

  // fetch product events on active product change
  useEffect(() => {
    if (activeProduct != null) {
      fetchProductEvents(activeProduct.id);
    }
  }, [activeProduct]);

  return (
    <main className="flex relative w-full min-h-screen items-start justify-center">
      <Head>
        <title key="title">TLIP</title>
      </Head>

      {/* side/top nav bar  */}
      <Nav />
      <div className="w-full h-full pt-28 px-8 sm:px-24 flex justify-center">
        <div className="w-full sm:max-w-730">
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

        {/* Modal to create/edit product  */}
        <CreateOrEditProduct
          activeProduct={activeProduct}
          setCreateOrEditModalOpen={setCreateOrEditModalOpen}
          setItemCreationOrEditStatus={setItemCreationOrEditStatus}
          setIsEditingProduct={setIsEditingProduct}
          createNewProduct={createNewProduct}
          updateProduct={updateProduct}
          fetchProductEvents={fetchProductEvents}
          createOrEditModalOpen={createOrEditModalOpen}
          isEditingProduct={isEditingProduct}
          itemCreationOrEditStatus={itemCreationOrEditStatus}
        />
      </div>
    </main>
  );
}
