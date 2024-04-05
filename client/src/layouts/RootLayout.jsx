import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Title from "../Title/Title";

const RootLayout = () => {
  return (
    <>
      <Title />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
