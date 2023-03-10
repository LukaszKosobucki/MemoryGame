import styled, { createGlobalStyle } from "styled-components";

export const colors = {
  colorDarkBackgroundBasic: "#2d3142",
  GreyUselessBasic: "#4f5d75",
  GreyishBlahBasic: "#bfc0c0",
  OrangeJusticeBasic: "#ef8354",
  WhiteDamnationBasic: "#ffffff",
  GreyUseless200: "#b9c7e3",
  GreyUseless50: "#e6f4ff",
  DarkBackground800: "#474b5d",
};

export const typography = {
  fontSize: "16px",
  fontFamily: "Rowdies",
  paragraphBase: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: "175%",
  },
  paragraphLarge: {
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: "150%",
  },
  heading1: {
    fontSize: "3rem",
    fontWeight: 700,
    lineHeight: "60px",
  },
  heading2: {
    fontSize: "2.5rem",
    fontWeight: 700,
    lineHeight: "47px",
  },
  heading3: {
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: "37px",
  },
  heading4: {
    fontSize: "1.5rem",
    fontWeight: 700,
    lineHeight: "30px",
  },
  heading5: {
    fontSize: "1.25rem",
    fontWeight: 700,
    lineHeight: "24px",
  },
  heading6: {
    fontSize: "1rem",
    fontWeight: 700,
    lineHeight: "19px",
  },
};

export const Heading1 = styled.h1`
  font-size: ${typography.heading1.fontSize};
  font-weight: ${typography.heading1.fontWeight};
  line-height: ${typography.heading1.lineHeight};
`;
export const Heading2 = styled.h2`
  font-size: ${typography.heading2.fontSize};
  font-weight: ${typography.heading2.fontWeight};
  line-height: ${typography.heading2.lineHeight};
`;
export const Heading3 = styled.h3`
  font-size: ${typography.heading3.fontSize};
  font-weight: ${typography.heading3.fontWeight};
  line-height: ${typography.heading3.lineHeight};
`;
export const Heading4 = styled.h4`
  font-size: ${typography.heading4.fontSize};
  font-weight: ${typography.heading4.fontWeight};
  line-height: ${typography.heading4.lineHeight};
`;
export const Heading5 = styled.h5`
  font-size: ${typography.heading5.fontSize};
  font-weight: ${typography.heading5.fontWeight};
  line-height: ${typography.heading5.lineHeight};
`;
export const Heading6 = styled.h6`
  font-size: ${typography.heading6.fontSize};
  font-weight: ${typography.heading6.fontWeight};
  line-height: ${typography.heading6.lineHeight};
`;

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
    }

    body {
        color: ${colors.WhiteDamnationBasic};
        font-family: ${typography.fontFamily};
        overflow-x: clip;
        background-color: ${colors.colorDarkBackgroundBasic};
        font-size: 16px;
        @media (max-width: 600px) {
          width: 100vw;
          height: 100%;
          position:fixed
        }
   
       
    }
    
    html {
        scroll-behavior: smooth;
        @media (max-width: 600px) {
          width: 100vw;
          height: 100vh;
          position:fixed
        }
        overflow-x: hidden;
        overflow-y: hidden;
    }

    #root {
        display: flex;
    }

    a:active, a:link,a:visited ,a:hover  {
        color: inherit;
        text-decoration: none;
    }
`;
