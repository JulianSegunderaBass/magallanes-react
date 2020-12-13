// Makes sure each page is 
// automatically scrolled to top upon loading

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'

const AutoScroll = () => {
    // Use Location gets the current page location data
    // Includes pathname
    const {pathname} = useLocation();

    // Scroll to top when page loads
    // useEffect runs arrow function upon page loading
    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0
        });
        // Condition meaning "scroll when pathname changes"
    }, [pathname]);
    return null;
}

export default AutoScroll;