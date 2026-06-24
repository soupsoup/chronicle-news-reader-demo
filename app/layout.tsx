import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "./lib/store";
import Header from "./components/Header";
import TabBar from "./components/TabBar";

export const metadata: Metadata = {
  title: "Chronicle — Reader Demo",
  description:
    "Demo build of the Chronicle News reader app. Fictional data only.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg-secondary">
        <StoreProvider>
          <div className="mx-auto flex min-h-screen max-w-md flex-col bg-bg-secondary">
            <Header />
            <main className="flex-1 overflow-y-auto pb-4">{children}</main>
            <TabBar />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
