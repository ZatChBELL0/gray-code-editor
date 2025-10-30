import Footer from "@/modules/home/footer";
import { Header } from "@/modules/home/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "GrayCode - Editor",
    default: "Code Editor For Next Level - GrayCode",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="z-20 relative w-full pt-0">{children}</main>

      <Footer />
    </>
  );
}
