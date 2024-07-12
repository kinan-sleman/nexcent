import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface UpdateCardProps {
  image: string;
  title: string;
  link: string;
}

const UpdateCard: React.FC<UpdateCardProps> = ({ image, title, link }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <motion.div
      ref={ref}
      variants={animationVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative bg-white w-full md:w-[384px] rounded-lg "
    >
      <img className="h-48 w-full object-cover" src={
                  isProduction
                    ? import.meta.env.VITE_PUBLIC_URL + image
                    : image
                } alt={title} />
      <div className="absolute translate-y-[30px] inset-0 flex justify-center items-center">
        <div className="shadow-md py-1 px-2 z-10 bg-[rgb(244,250,255)] rounded w-[240px] text-center translate-y-[25%]">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <a
            href={link}
            className="mt-2 text-green-600 hover:text-green-800 font-medium inline-flex items-center"
          >
            Read more →
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default UpdateCard;
