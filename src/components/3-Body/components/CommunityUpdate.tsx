import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { loadCommunityUpdates } from "../../../store/CommunityUpdate/Reducer";
import UpdateCard from "./UpdateCard";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const CommunityUpdate: React.FC = () => {
  const communityUpdatesData = useSelector(
    (state: RootState) => state.communityUpdate.communityUpdates
  );
  const dispatch = useDispatch<AppDispatch>();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    dispatch(loadCommunityUpdates());
  }, [dispatch]);

  if (!communityUpdatesData) return null;

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="flex items-center justify-center flex-col">
        <h2 className="text-3xl text-center font-[600] text-gray-900">
          {communityUpdatesData.title}
        </h2>
        <p className="max-w-[500px] mt-4 text-lg text-gray-500 text-center">
          {communityUpdatesData.description}
        </p>
      </div>
      <motion.div
        className="mt-12 grid gap-8 gap-y-24 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {communityUpdatesData.updates.map((update, index) => (
          <motion.div key={index} variants={itemVariants}>
            <UpdateCard
              image={update.image}
              title={update.title}
              link={update.link}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CommunityUpdate;
