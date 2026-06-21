import "@/styles/tokens.css";
import "@/styles/foundation.css";
import "@/styles/components.css";
import "@/app/globals.css";

import { Inter, Poppins } from "next/font/google";
import type { Metadata } from "next";
import { BoardProvider } from "@/components/providers/BoardProvider";
import { SearchProvider } from "@/components/providers/SearchProvider";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { ModalProvider } from "@/components/providers/ModalProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Workflow App",
  description: "A premium workflow management experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <BoardProvider>
          <ModalProvider>
            <SearchProvider>
              <Sidebar />
              <Header />
              <main className="main-content">{children}</main>
            </SearchProvider>
          </ModalProvider>
        </BoardProvider>
      </body>
    </html>
  );
}
