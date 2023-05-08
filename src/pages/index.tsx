import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Header } from "@/components/header";
import { EmptyState } from "@/components/emptyState";
import { Nav } from "@/components/nav";
import { products } from "@/products";
import { ProductDetails } from "@/components/productDetails";
import { ProductsList } from "@/containers/ProductsList";
import { CreateProductModal } from "@/containers/CreateProductModal";
import { Location, Custodian } from "@/types";
import { InputField } from "@/components/inputs";

export default function Home() {
  const [productsList, setProductsList] = useState(products);
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
  const [custodian, setCustodian] = useState<Custodian>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

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

  const handleCustodianChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustodian({
      ...custodian,
      [e.target.id]: e.target.value,
    });
  };

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
              <ProductsList />
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
              <ProductDetails />
            </div>
          )}
        </div>

        {/* product creation modal  */}
        <CreateProductModal
          createModalOpen={createModalOpen}
          setCreateModalOpen={setCreateModalOpen}
          name={name}
          handleNameChange={handleNameChange}
          description={description}
          handleDescriptionChange={handleDescriptionChange}
          price={price}
          handlePriceChange={handlePriceChange}
          color={color}
          handleColorChange={handleColorChange}
          productLocation={productLocation}
          handleLocationChange={handleLocationChange}
          custodian={custodian}
          handleCustodianChange={handleCustodianChange}
        />
      </div>
    </main>
  );
}
