import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loadNavigationLinks } from "../../store/Header/Reducer";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigationLinks = useSelector(
    (state: RootState) => state.header.navigationLinks
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadNavigationLinks());
  }, [dispatch]);

  const toggleMenuHandler = () => {
    setIsOpen(!isOpen);
  };

  if (!navigationLinks) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  const menuVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };
  const isProduction = process.env.NODE_ENV === 'production';
  return (
    <motion.header
      className="bg-white shadow"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container mx-auto flex justify-between md:justify-around items-center p-4">
        <motion.div className="flex items-center" variants={menuVariants}>
          <img
            src={isProduction ? import.meta.env.VITE_PUBLIC_URL + navigationLinks.icon : navigationLinks.icon}
            alt="Nexcent Logo"
            className="w-6 h-6 mr-2"
          />
          <span className="text-xl font-semibold">{navigationLinks.title}</span>
        </motion.div>
        <motion.nav
          className="hidden md:flex space-x-4 items-center"
          initial="hidden"
          animate="visible"
          variants={menuVariants}
        >
          {navigationLinks.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              className="text-gray-600 hover:text-gray-900"
            >
              {link.title}
            </a>
          ))}
          <a
            href={navigationLinks?.btn?.link}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {navigationLinks?.btn?.title} →
          </a>
        </motion.nav>
        <div className="md:hidden">
          <button onClick={toggleMenuHandler} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="md:hidden"
          initial="hidden"
          animate="visible"
          variants={menuVariants}
        >
          <nav className="flex flex-col space-y-2 items-start p-4">
            {navigationLinks.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="text-gray-600 hover:text-gray-900"
              >
                {link.title}
              </a>
            ))}
            <a
              href={navigationLinks.btn.link}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {navigationLinks.btn.title} →
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
