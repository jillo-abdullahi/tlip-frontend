import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="TLIP UI" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-blue-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
