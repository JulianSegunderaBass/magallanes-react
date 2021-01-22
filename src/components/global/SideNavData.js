// Navbar Data for the Sidenav

import React from 'react';
// Importing all production Icons with code names
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';

export const SideNavData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text"
    },
    {
        title: "Faq",
        path: "/faq",
        icon: <AiIcons.AiOutlineQuestionCircle />,
        cName: "nav-text"
    },
    {
        title: "News Reports",
        path: "/news",
        icon: <AiIcons.AiOutlineAlert />,
        cName: "nav-text"
    },
    {
        title: "Service Offerings",
        path: "#",
        icon: <FaIcons.FaNewspaper />,
        cName: "nav-text"
    }
];