import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { loadCarousel } from "../../../store/Carousel/Reducer";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Carousel: React.FC = () => {
  const CarouselArr = useSelector(
    (state: RootState) => state.carousel.carousel
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCarousel());
  }, [dispatch]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slideVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 100, transition: { duration: 0.5 } },
  };

  if (!CarouselArr || CarouselArr.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className="relative bg-gray-100 h-auto flex items-center md:h-[416px]">
      <div className="container mx-auto flex justify-around items-center py-4 px-6 flex-col md:flex-row">
        <AnimatePresence>
          {inView && (
            <motion.div
              key={currentSlide}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-5 md:mt-0 md:max-w-[300px] lg:max-w-[400px]"
            >
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                {CarouselArr[currentSlide].title
                  .split(" ")
                  .map((word, index) => (
                    <span
                      key={index}
                      className={
                        word === "from" || word === "years"
                          ? "text-green-500"
                          : ""
                      }
                    >
                      {word}{" "}
                    </span>
                  ))}
              </h1>
              <p className="text-gray-600 mt-4">
                {CarouselArr[currentSlide].description}
              </p>
              <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                {CarouselArr[currentSlide].button}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {inView && (
            <motion.div
              key={currentSlide}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.img
                src={CarouselArr[currentSlide].image}
                alt="Carousel Slide"
                className="w-48 h-48 md:w-64 md:h-64 object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {CarouselArr.map((_, index) => (
          <button
            key={index}
            className={`block w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
