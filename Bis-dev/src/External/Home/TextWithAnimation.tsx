import React from "react";
import { motion } from "framer-motion";
interface Props {
  text: string;
}
const TextWithAnimation = ({ text }: Props) => {
  return (
    <motion.div
      key={text} // Key change triggers animation
      className="text25"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {text}
    </motion.div>
  );
};

export default TextWithAnimation;
