"use client";

import { HTMLMotionProps, motion } from "framer-motion";

/*
  Every page's content area: the screen's side gutter and vertical rhythm, with
  the existing fade-in kept (shortened so it reads as the tube warming up).
*/
const PageWrapper = ({ className, ...props }: HTMLMotionProps<"div">) => {
  return (
    <motion.div
      {...props}
      className={`pad pt-[34px] pb-14 max-frame:pt-6 max-frame:pb-10 ${className ?? ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.15 }}
    />
  );
};

export default PageWrapper;
