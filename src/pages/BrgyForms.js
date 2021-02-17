import React from "react";

import "./BrgyForms.css";

const BrgyForms = () => {
  return (
    <div className='form-container'>
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScYarwDi-xSpRAadDFt047ZhpTu2YDJFzrclVG_ue8uPf4opA/viewform?embedded=true"
        // width="640"
        // height="1500"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        className="form-iframe"
      >
        Loading…
      </iframe>
    </div>
  );
};

export default BrgyForms;
