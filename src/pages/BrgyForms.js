// Embedded Google Form

// Functional Imports
import React from "react";
// Styling + Animation Imports
import styled from 'styled-components';

const BrgyForms = () => {
  return (
    <FormContainer>
      <FormIframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScYarwDi-xSpRAadDFt047ZhpTu2YDJFzrclVG_ue8uPf4opA/viewform?embedded=true"
        // width="640"
        // height="1500"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
      >
        Loading…
      </FormIframe>
    </FormContainer>
  );
};

// Styled Components
const FormContainer = styled.div`
  width: 100%;
  height: 1500px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const FormIframe = styled.iframe`
  flex: 1;
  height: 100%;
`

export default BrgyForms;
