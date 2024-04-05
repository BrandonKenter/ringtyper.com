import {
  faBars,
  faBriefcase,
  faBug,
  faCommentDots,
  faHandshakeAngle,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = () => {
  return (
    <div className="min-h-screen bg-neutral-800 px-10">
      <div className="flex flex-col justify-center items-center pt-20">
        <div className="flex flex-col items-center text-center">
          <span className="text-neutral-50 text-xl font-extrabold">
            Contact Us
          </span>
          <span className="text-neutral-500">
            Feel free to contact us regarding any of the following topics.
          </span>
          <span className="text-neutral-500">
            All inquiries will be directed to{" "}
            <a href="mailto:contact@ringtyper.com?subject=General" className="text-rose-600 hover:text-neutral-50 transition duration-300 cursor-pointer">
              contact@ringtyper.com
            </a>
            .
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 py-10">
          <a
            href="mailto:contact@ringtyper.com?subject=Feature"
            className="gap-2 p-3 cursor-pointer border-2 transition duration-300 group hover:text-neutral-300 hover:border-neutral-300 font-semibold border-rose-600 flex items-center justify-center w-56 rounded-md h-12 text-rose-600"
          >
            <FontAwesomeIcon
              className="text-rose-600 transition duration-300 w-7 h-7 group-hover:text-neutral-300"
              icon={faToolbox}
            />
            <span className="mr-auto">Request a Feature</span>
          </a>
          <a
            href="mailto:contact@ringtyper.com?subject=Bug"
            className="gap-2 p-3 cursor-pointer border-2 transition duration-300 group hover:text-neutral-300 hover:border-neutral-300 font-semibold border-rose-600 flex items-center justify-center w-56 rounded-md h-12 text-rose-600"
          >
            <FontAwesomeIcon
              className="text-rose-600 transition duration-300 w-7 h-7 group-hover:text-neutral-300"
              icon={faBug}
            />
            <span className="mr-auto">Report a Bug</span>
          </a>
          <a
            href="mailto:contact@ringtyper.com?subject=Feedback"
            className="gap-2 p-3 cursor-pointer border-2 transition duration-300 group hover:text-neutral-300 hover:border-neutral-300 font-semibold border-rose-600 flex items-center justify-center w-56 rounded-md h-12 text-rose-600"
          >
            <FontAwesomeIcon
              className="text-rose-600 transition duration-300 w-7 h-7 group-hover:text-neutral-300"
              icon={faCommentDots}
            />
            <span className="mr-auto">Provide Feedback</span>
          </a>
          <a
            href="mailto:contact@ringtyper.com?subject=Help"
            className="gap-2 p-3 cursor-pointer border-2 transition duration-300 group hover:text-neutral-300 hover:border-neutral-300 font-semibold border-rose-600 flex items-center justify-center w-56 rounded-md h-12 text-rose-600"
          >
            <FontAwesomeIcon
              className="text-rose-600 transition duration-300 w-7 h-7 group-hover:text-neutral-300"
              icon={faHandshakeAngle}
            />
            <span className="mr-auto">Get Help</span>
          </a>
          <a
            href="mailto:contact@ringtyper.com?subject=Business"
            className="gap-2 p-3 cursor-pointer border-2 transition duration-300 group hover:text-neutral-300 hover:border-neutral-300 font-semibold border-rose-600 flex items-center justify-center w-56 rounded-md h-12 text-rose-600"
          >
            <FontAwesomeIcon
              className="text-rose-600 transition duration-300 w-7 h-7 group-hover:text-neutral-300"
              icon={faBriefcase}
            />
            <span className="mr-auto">Business Inquiry</span>
          </a>
          <a
            href="mailto:contact@ringtyper.com?subject=General"
            className="gap-2 p-3 cursor-pointer border-2 transition duration-300 group hover:text-neutral-300 hover:border-neutral-300 font-semibold border-rose-600 flex items-center justify-center w-56 rounded-md h-12 text-rose-600"
          >
            <FontAwesomeIcon
              className="text-rose-600 transition duration-300 w-7 h-7 group-hover:text-neutral-300"
              icon={faBars}
            />
            <span className="mr-auto">Something Else</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
