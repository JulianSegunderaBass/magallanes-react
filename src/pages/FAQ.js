// The FAQ Page
// Compiles Components from folder "for-faq"

// Functional Imports
import React from "react";
// Component Imports
import FaqSection from "../components/for-faq/FaqSection";
import AutoScroll from "../assets/AutoScroll";
// Animation Imports
import { motion } from "framer-motion";
import { pageLoad } from "../assets/Animations";

const FAQ = () => {
  return (
    // Motion (animated) div as root component
    <motion.div variants={pageLoad} initial="hidden" animate="show" exit="exit">
      {/* Auto Scrolling Component */}
      <AutoScroll />
      <FaqSection />
    </motion.div>
  );
};

export default FAQ;
