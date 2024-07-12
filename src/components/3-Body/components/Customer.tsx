import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface CustomerProps {
  logo: string;
  description: string;
  name: string;
  association: string;
  customerLogos: string[];
  btn: any;
}

const Customer: React.FC<CustomerProps> = ({
  logo,
  description,
  name,
  association,
  customerLogos,
  btn,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);
  const isProduction = process.env.NODE_ENV === "production";
  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={animationVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="bg-gray-100 py-12 px-6 md:px-12"
    >
      <div className="px-6 py-1 md:px-24 md:py-5 flex flex-col md:flex-row items-center justify-center rounded-xl md:items-start md:justify-around gap-[40px] ">
        <motion.div
          className="md:w-1/3 shrink-0"
          variants={animationVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <img
            className="size-[300px]"
            src={isProduction ? process.env.PUBLIC_URL + logo : logo}
            alt="Company logo"
          />
        </motion.div>
        <motion.div
          className="flex flex-col md:gap-[10px] items-center md:items-start text-center md:text-start"
          variants={animationVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <p className="text-gray-700 text-sm">{description}</p>
          <div className="flex items-center space-x-4">
            <div>
              <div className="text-xl font-medium text-green-500">{name}</div>
              <p className="text-gray-500">{association}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-between space-x-2 mt-5 w-[100%]">
            <div className="flex gap-[20px]">
              {customerLogos.map((customerLogo, index) => (
                <motion.img
                  key={index}
                  className="size-[30px]"
                  src={
                  isProduction
                    ? process.env.PUBLIC_URL + customerLogo
                    : customerLogo
                }
                  alt="Customer logo"
                  variants={animationVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                />
              ))}
            </div>
            <a
              href={btn.link}
              className="flex justify-center items-center gap-3 text-green-600 hover:text-green-800 font-medium"
            >
              {btn.title}{" "}
              <div className="icon-arrow-thin-right mt-1 text-[10px]"></div>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Customer;
