import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import { TailwindIndicator } from "./tailwind-indicator";

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <div className=" flex min-h-screen flex-col scroll-smooth antialiased">
      <Header />
      <Hero></Hero>
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
      <Outlet />

      <TailwindIndicator />
    </div>
  );
};

export default RootLayout;
