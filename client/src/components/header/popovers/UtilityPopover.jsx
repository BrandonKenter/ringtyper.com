import { AnimatePresence, motion } from "framer-motion";

const UtilityPopover = ({ popoverDescription, iconHovered, modalOpened }) => {
  return (
    <AnimatePresence>
      {iconHovered && !modalOpened && (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.1,
          }}
          className="absolute mx-auto top-9 w-full bg-red-500 flex justify-center z-40"
        >
          <span className="font-semibold text-sm text-neutral-300 shadow-lg h-fit px-2 py-1 rounded-md text-center bg-neutral-900">
            {popoverDescription}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UtilityPopover;
