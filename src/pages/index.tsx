import Head from "next/head";
import { Header } from "@/components/header";
import { EmptyState } from "@/components/emptyState";
import { Nav } from "@/components/nav";
import { products } from "@/products";
import { ProductsList } from "@/containers/ProductsList";

export default function Home() {
  return (
    <main className="flex relative w-full min-h-screen items-start justify-center">
      <Nav />

      <Head>
        <title key="title">tlip-ui</title>
      </Head>
      <div className="w-full h-full p-24 flex justify-center">
        <div className="w-full max-w-730">
          {/* header section  */}

          <Header />

          {/* empty state section  */}
          {products.length ? (
            <div className="mt-14">
              <ProductsList />
            </div>
          ) : (
            <div className="mt-16">
              <EmptyState />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
