import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loadFooter } from "../../store/Footer/Reducer";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Footer: React.FC = () => {
  const footerData = useSelector((state: RootState) => state.footer.footer);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadFooter());
  }, [dispatch]);

  if (!footerData) return null;

  const { company_info, sections, newsletter } = footerData.footer;

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
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
  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <motion.div
      ref={ref}
      className="flex flex-col"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div
        className="w-full flex flex-col gap-3 items-center justify-center bg-gray-100 h-[300px]"
        variants={itemVariants}
      >
        <h1 className="max-w-[500px] text-center font-[600] text-[30px] md:text-[50px]">
          {footerData.demo_title}
        </h1>
        <a
          href={footerData.demo_btn.link}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {footerData.demo_btn.title} →
        </a>
      </motion.div>
      <footer className="bg-gray-900 text-gray-400 py-12 w-full">
        <motion.div
          className="max-w-7xl mx-auto px-4 px-6 md:px-8 flex flex-wrap gap-y-5 justify-start md:justify-start lg:justify-around items-center"
          variants={containerVariants}
        >
          <motion.div
            className="flex flex-wrap justify-between items-center"
            variants={itemVariants}
          >
            <div className="flex flex-col max-w-[250px] gap-5">
              <div className="flex gap-2">
                <img
                  src={
                    isProduction
                      ? process.env.PUBLIC_URL + company_info.logo
                      : company_info.logo
                  }
                  alt={`${company_info.name} Logo`}
                  className="w-6 h-6 mr-2"
                />
                <span className="text-white text-lg font-bold">
                  {company_info.name}
                </span>
              </div>
              <div className="mt-8 text-gray-400">
                <p>{company_info.copyright}</p>
              </div>
              <div className="flex gap-5">
                {company_info.social_links.map((social, index) => (
                  <a key={index} href={social.link}>
                    <div
                      className={`icon-${social.platform}-with-circle`}
                    ></div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          {sections.map((section, index) => (
            <motion.div
              key={index}
              className="w-full sm:w-1/2 md:w-1/4 mb-6 md:mb-0"
              variants={itemVariants}
            >
              <h3 className="text-white mb-3">{section.title}</h3>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.link}
                      className="text-gray-400 hover:text-gray-100"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <motion.div
            className="w-full sm:w-1/2 md:w-1/4 flex-grow"
            variants={itemVariants}
          >
            <h3 className="text-white mb-3">{newsletter.title}</h3>
            <div className="flex relative items-center">
              <input
                type="email"
                placeholder={newsletter.placeholder}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-300 focus:outline-none"
              />
              <button className="absolute right-0 px-4 py-2 rounded-r-lg text-white focus:outline-none">
                <div className={newsletter.button_icon}></div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </footer>
    </motion.div>
  );
};

export default Footer;
