import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { loadClients } from "../../../store/Clients/Reducer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Clients: React.FC = () => {
  const clientsData = useSelector((state: RootState) => state.clients.clients);
  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 0.5, 
    triggerOnce: true
  });

  useEffect(() => {
    dispatch(loadClients());
  }, [dispatch]);

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  if (!clientsData) {
    return null;
  }

  return (
    <div className="bg-white py-12">
      <div ref={ref} className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-2">{clientsData.title}</h2>
        <p className="text-gray-600 mb-8">{clientsData.description}</p>
        <div className="px-5">
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            breakpoints={{
              768: {
                slidesPerView: 7,
              },
            }}
            onSlideChange={() => console.log("slide change")}
          >
            {clientsData.clients.map((client, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center"
              >
                <motion.div
                  className={`h-16 w-auto ${client}`}
                  style={{ backgroundImage: `url(${client})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
                  variants={slideVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                ></motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Clients;
