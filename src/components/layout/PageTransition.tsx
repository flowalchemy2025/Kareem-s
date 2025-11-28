import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    setShowTransition(true);
    const timer = setTimeout(() => {
      setShowTransition(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [children]);

  return (
    <>
      <AnimatePresence>
        {showTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="font-display text-4xl md:text-6xl font-bold text-primary"
            >
              Kareem's
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
