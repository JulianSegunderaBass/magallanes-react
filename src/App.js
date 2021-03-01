// The Root App component which renders the pages and global components

// Functional Imports
import React from "react";
// Page Imports
import Landing from "./pages/Landing";
import FAQ from "./pages/FAQ";
import NewsPage from "./pages/NewsPage";
import AnnouncementDetails from "./pages/AnnouncementDetails";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ProfilePage from "./pages/ProfilePage";
import BrgyForms from "./pages/BrgyForms";
import Footer from "./components/global/Footer";
import SideNav from "./components/global/navigation/SideNav";
// Component Imports
import { Switch, Route, useLocation } from "react-router-dom";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
// Styling + Animation Imports
import GlobalStyle from "./assets/GlobalStyle";

function App() {
  const currentLocation = useLocation();

  return (
    // React Router is not very specific with paths.
    // Use Switch Component.
    // Note: The Navbar and Footer stay constant on all paths
    <div className="App">
      <GlobalStyle />
      <SideNav />
      <ReactNotification />
      {/* Wrapping the Switch with Animate Presence */}
      {/* exitBeforeEnter says to wait until current component 
            is closed before animating the next component */}
      {/* location and pathname needed for Animate Presence */}
      <Switch location={currentLocation} key={currentLocation.pathname}>
        <Route path="/" component={Landing} exact />
        <Route path="/faq" component={FAQ} exact />
        <Route path="/news" component={NewsPage} exact />
        <Route path="/news-announcement/:id" component={AnnouncementDetails} exact />
        <Route path="/sign-in" component={SignIn} exact />
        <Route path="/sign-up" component={SignUp} exact />
        <Route path="/my-profile" component={ProfilePage} exact />
        <Route path="/brgyforms" component={BrgyForms} exact />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
