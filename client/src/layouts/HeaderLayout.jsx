import { Outlet } from "react-router-dom";
import Title from "../components/Title";

const HeaderLayout = () => {
  return (
    <>
      <Title />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default HeaderLayout;
