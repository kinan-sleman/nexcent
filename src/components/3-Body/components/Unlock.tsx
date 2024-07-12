import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface UnlockProps {
  image: string;
  title: string;
  description: string;
  btn: any;
}

const Unlock: React.FC<UnlockProps> = ({ image, title, description, btn }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const isProduction = process.env.NODE_ENV === 'production';
  
  return (
    <motion.div
      ref={ref}
      className="flex flex-col md:flex-row items-center justify-center py-12 px-6 md:px-12"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      <div className="md:w-1/3 flex justify-center mb-8 md:mb-0">
        <img
          src={isProduction ? import.meta.env.VITE_PUBLIC_URL + image : image}
          alt="Illustration"
          className="size-[300px]"
        />
      </div>
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <a
          href={btn?.link}
          className="bg-green-500 text-white font-semibold py-2 px-6 rounded hover:bg-green-600 transition duration-300"
        >
          {btn?.title}
        </a>
      </div>
    </motion.div>
  );
};

export default Unlock;
