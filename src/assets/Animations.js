// Animations for Component Elements + Pages loading
// Note: animation names are used as "variants" props in motion elements

// Page Load animation is applied to the pages
export const pageLoad = {
    // Hidden property -> initial state
    hidden: {
        opacity: 0,
        y: 150
    },
    // Show property -> state when shown
    show: {
        opacity: 1,
        y: 0,
        // Transition -> details for the transition
        transition: {
            duration: 0.3,
            // Page animation before children animation
            // Staggering lets children animate independnetly
            when: "beforeChildren",
            staggerChildren: 0.25
        }
    },
    // Exit property -> state when closed
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3
        }
    }
}