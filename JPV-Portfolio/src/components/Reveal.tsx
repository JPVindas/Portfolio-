import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Reveal({
  children,
  y = 16,
  delay = 0,
}: {
  children: React.ReactNode;
  y?: number;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px 0px -100px 0px", once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
