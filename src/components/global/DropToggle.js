// A reusable component for toggling content
// Can be used for the Faq or Statements
// Wrap toggling elements with the "DropToggle" component in other files

import React, { useState } from 'react';
// Importing Framer Motion
import { motion } from 'framer-motion';

// Props passed are the wrapped children of the DropToggle component
// Title is passed as a prop
const DropToggle = ({children, title}) => {

    // State for toggling a component
    // By default, content is hidden (false)
    const [toggle, setToggle] = useState(false);

    return (
        // motion.div so "Animate Shared Layout" works where
        // component is used
        // Toggled State is flipped with each click
        <motion.div className="toggle-element" layout onClick={() => setToggle(!toggle)}>
            <motion.h4 layout>
                {title}
            </motion.h4>
            {/* Is toggle true? If so, render children,
            if not, render nothing */}
            {toggle ? children : ""}
            {/* Line beneath each toggle element */}
            <div className="line"></div>
        </motion.div>
    )
}

export default DropToggle;