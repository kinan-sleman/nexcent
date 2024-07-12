import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { loadCommunities } from "../../../store/Communities/Reducer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Community: React.FC = () => {
  const communitiesData = useSelector((state: RootState) => state.communities);
  const dispatch = useDispatch();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    dispatch(loadCommunities());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  if (!communitiesData) {
    return null; 
  }

  return (
    <div className="p-8">
      <motion.div
        ref={ref}
        className="max-w-4xl flex flex-col items-center text-center mx-auto"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.h1
          className="text-3xl max-w-[500px] font-semibold text-gray-800 mb-4"
          variants={itemVariants}
        >
          {communitiesData.title}
        </motion.h1>
        <motion.p className="text-[#717171]" variants={itemVariants}>
          {communitiesData.description}
        </motion.p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {communitiesData?.communities?.map((community, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              variants={itemVariants}
            >
              <div className="relative flex flex-col items-center mb-4">
                <div className="absolute rounded-ss-[10px] rounded-ee-[10px] bg-[#E8F5E9] size-[50px] translate-x-[25px] translate-y-[5px]"></div>
                <div
                  className={`relative z-2 ${community.icon} text-[55px] text-[#9b9999]`}
                ></div>
                <h2 className="text-[23px] font-extrabold font-[650] text-[#3b3a3a] text-center">
                  {community.title}
                </h2>
              </div>
              <p className="text-gray-600 text-center">
                {community.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Community;
