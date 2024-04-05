import { AnimatePresence, motion } from "framer-motion";

const GamePopover = ({
  tabHovered,
  modalOpened,
  gameTitle,
  gameDescription,
}) => {
  return (
    <AnimatePresence>
      {tabHovered && !modalOpened && (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.1,
          }}
          className="absolute mx-auto top-9 -left-[74px] shadow-lg w-44 h-fit z-40 p-1 bg-neutral-900 rounded-md text-center"
        >
          <h4 className="font-semibold text-sm text-neutral-300">
            {gameTitle}
          </h4>
          <p className="text-sm text-neutral-500">{gameDescription}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GamePopover;
