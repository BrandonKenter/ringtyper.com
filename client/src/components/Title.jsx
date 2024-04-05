import { NavLink } from "react-router-dom";
import img from "../static/images/y2.svg";

const Title = () => {
  return (
    <div className="w-full flex items-center justify-center gap-1 py-2 bg-neutral-800">
      <NavLink to="/" className="cursor-pointer flex items-center group">
        <img
          className="h-8 rounded-full group-hover:rotate-90 transition duration-500 ease-in-out"
          src={img}
        />
        <span className="font-extrabold text-rose-600 text-3xl">Ring</span>
        <span className="text-neutral-500 font-semibold text-3xl">Typer</span>
      </NavLink>
    </div>
  );
};

export default Title;
