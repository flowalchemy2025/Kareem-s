import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className="
        w-16 h-8 
        rounded-full 
        bg-muted dark:bg-card 
        relative 
        flex items-center 
        cursor-pointer 
        shadow-inner 
        transition-all
      "
      onClick={toggleTheme}
    >
      {/* Background Icons */}
      <div className="absolute left-2 text-foreground/60 text-sm">
        <Sun size={14} />
      </div>
      <div className="absolute right-2 text-foreground/60 text-sm">
        <Moon size={14} />
      </div>

      {/* Sliding Ball */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="
          w-7 h-7 
          rounded-full 
          bg-primary 
          shadow-md 
          flex items-center justify-center
        "
        animate={{ x: theme === "dark" ? 32 : 0 }}
      >
        {theme === "light" ? (
          <Sun size={14} className="text-primary-foreground" />
        ) : (
          <Moon size={14} className="text-primary-foreground" />
        )}
      </motion.div>
    </div>
  );
}
