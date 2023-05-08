import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Header } from "@/components/header";
import { EmptyState } from "@/components/emptyState";
import { Nav } from "@/components/nav";
import { products } from "@/products";
import { ProductDetails } from "@/components/productDetails";
import { ProductsList } from "@/containers/ProductsList";

export default function Home() {
  const [productsList, setProductsList] = useState(products);
  const [activeProduct, setActiveProduct] = useState(products[0]);

  return (
    <main className="flex relative w-full min-h-screen items-start justify-center">
      <Nav />

      <Head>
        <title key="title">tlip-ui</title>
      </Head>
      <div className="w-full h-full p-24 flex justify-center">
        <div className="w-full max-w-730">
          {/* header section  */}
          {activeProduct == null && <Header />}

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
      </div>
    </main>
  );
}
