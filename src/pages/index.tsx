import Image from "next/image";
import Head from "next/head";
import { Header } from "@/components/header";
import { Button, ButtonWithIcon } from "@/components/buttons";
export default function Home() {
  return (
    <main className="flex w-full min-h-screen items-center justify-center p-24">
      <Head>
        <title key="title">tlip-ui</title>
      </Head>
      <div className="w-full max-w-730">
        {/* header section  */}
        <Header />
      </div>
    </main>
  );
}
