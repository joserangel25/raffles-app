import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer, Navbar, Provider } from "@/components";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RifApps",
  description: "Genera sorteos para tus seguidores en Discord",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <main
          // className="min-h-screen bg-[var(--color-primary)]  min-w-full grid grid-rows-[auto,1fr,60px] "
          className="min-h-screen bg-primary min-w-full flex flex-col"
        >
          <Provider>
            <Navbar />
            <section className="grow text-white lg:max-w-6xl md:mx-auto">
              {children}

              <ToastContainer
                pauseOnHover={false}
                position="top-right"
                autoClose={3000}
              />
            </section>
          </Provider>
          <Footer />
        </main>
      </body>
    </html>
  );
}
