import Navbar from "@/components/navbar/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="notranslate" translate="no">
      <head>
        <title>Gefest Builders</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <script
          async
          src="https://widget.cloudpayments.kz/bundles/cloudpayments.js"
        ></script>
      </head>

      <body>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
