import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const SignUpPageStyled = styled.div`
  .logo {
    margin: 20px auto;
  }
  h1 {
    font-size: 40px;
    color: ${(props) => props.theme.primary};
    font-weight: 600;
    text-align: center;
    line-height: 60px;
    margin-bottom: 30px;
  }
  .have-account {
    margin-bottom: 20px;
    margin-top: 10px;
    font-size: 16px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }
`;
const FormAuthen = ({ children }) => {
  return (
    <SignUpPageStyled>
      <div className="w-full max-w-[1000px] mx-auto">
        <NavLink to={"/"}>
          <img srcSet="/logo.png 1.5x" className="logo" alt="monkey-blogging" />
        </NavLink>
        <h1>Monkey Blogging</h1>
        {children}
      </div>
    </SignUpPageStyled>
  );
};

export default FormAuthen;
