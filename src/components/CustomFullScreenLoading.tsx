import { motion } from "framer-motion";

interface CustomFullScreenLoadingProps {
  message?: string;
}

const CustomFullScreenLoading: React.FC<CustomFullScreenLoadingProps> = ({
  message = "Cargando...",
}) => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 text-amber-800">
      {/* Spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full mb-6"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      {/* Texto animado */}
      <motion.p
        className="text-xl font-semibold tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {message}
      </motion.p>

      {/* Efecto de resplandor cálido en el fondo */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-300/20 via-orange-200/30 to-transparent blur-3xl"
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default CustomFullScreenLoading;
