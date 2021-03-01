// A reusable component for toggling content
// Can be used for the Faq or Statements
// Wrap toggling elements with the "DropToggle" component in other files

// Functional Imports
import React, { useState } from 'react';
// Styling + Animation Imports
import styled from 'styled-components';
import { motion } from 'framer-motion';


// Props passed are the wrapped children of the DropToggle component
// Title is passed as a prop
const DropToggle = ({children, title}) => {

    // Local State
    const [toggle, setToggle] = useState(false); // State for toggling a component. By default, content is hidden (false)

    return (
        // motion.div so "Animate Shared Layout" works where
        // component is used
        // Toggled State is flipped with each click
        <ToggleElement className="toggle-element" layout onClick={() => setToggle(!toggle)}>
            <Title layout>
                {title}
            </Title>
            {/* Is toggle true? If so, render children,
            if not, render nothing */}
            {toggle ? children : ""}
            {/* Line beneath each toggle element */}
            <div className="line"></div>
        </ToggleElement>
    )
}

// Styled Components + Color Variables
const hoverColor = "#E63946";

const ToggleElement = styled(motion.div)`

`
const Title = styled(motion.h4)`
    transition: color ease 0.3s;
    &:hover {
        color: ${hoverColor};
    }
`

export default DropToggle;