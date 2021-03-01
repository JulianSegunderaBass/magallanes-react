// Animations for Component Elements + Pages loading
// Note: animation names are used as "variants" props in motion elements

// Page Load animation is applied to the pages
export const pageLoad = {
    hidden: {
        opacity: 0,
        y: 150
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            when: "beforeChildren",
            staggerChildren: 0.25
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3
        }
    }
}

// A "slide up" animation for header elements
export const revealUp = {
    hidden: {
        y: 200
    },
    show: {
        y: 0,
        transition: {
            duration: 0.35,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.25
        }
    }
}

// A higher-offset "slide up" animation for header elements
export const strongRevealUp = {
    hidden: {
        y: 400
    },
    show: {
        y: 0,
        transition: {
            duration: 0.50,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.25
        }
    }
}

// A "slide up" animation for the news form
export const newsFormReveal = {
    hidden: {
        y: 600
    },
    show: {
        y: 0,
        transition: {
            duration: 0.75,
            ease: "easeOut",
            when: "beforeChildren",
            staggerChildren: 0.25
        }
    }
}

// Simple fade animation
export const fade = {
    hidden: {
        opacity: 0
    },
    show: {
        opacity: 1,
        transition: {
            duration: 0.75,
            ease: "easeOut"
        }
    }
}

// Animation to scale an image within a container
// with overflow set to "hidden"
export const imageAnim = {
    hidden: {
        scale: 1.5,
        opacity: 0
    },
    show: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.75,
            ease: "easeOut"
        }
    }
}