import {
  faClipboard,
  faEnvelope,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-neutral-400 bg-neutral-800 flex flex-col items-center justify-center pt-10 pb-5 px-10">
      <hr className="h-0.5 bg-neutral-700 border-0 my-5 w-full"></hr>
      <span className="text-neutral-500">Copyright © 2024 RingTyper</span>
      <div className="flex gap-4">
        <NavLink
          to="terms"
          className="flex gap-1 items-center cursor-pointer hover:text-neutral-50 transition duration-300"
        >
          <FontAwesomeIcon icon={faClipboard} />
          <span>Terms</span>
        </NavLink>
        <NavLink
          to="privacy"
          className="flex gap-1 items-center cursor-pointer hover:text-neutral-50 transition duration-300"
        >
          <FontAwesomeIcon icon={faShieldHalved} />
          <span>Privacy</span>
        </NavLink>
        <NavLink
          to="contact"
          className="flex gap-1 items-center cursor-pointer hover:text-neutral-50 transition duration-300"
        >
          <FontAwesomeIcon icon={faEnvelope} />
          <span>Contact</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
