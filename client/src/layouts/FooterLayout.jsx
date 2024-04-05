import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const FooterLayout = () => {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default FooterLayout;
