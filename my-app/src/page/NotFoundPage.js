import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyled = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    display: inline-block;
    margin-bottom: 20px;
  }
  .heading {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  .back {
    display: inline-block;
    padding: 15px 30px;
    color: white;
    background-color: ${(props) => props.theme.primary};
    border-radius: 4px;
    font-weight: 500;
  }
`;
const NotFoundPage = () => {
  document.title = "NotFound";
  return (
    <NotFoundPageStyled>
      <NavLink>
        <img className="logo" srcSet="logo.png 2x" alt="monkey-blogging" />
      </NavLink>
      <h1 className="heading">Opps! Page not found</h1>
      <NavLink to={"/"} className="back">
        Back to home
      </NavLink>
    </NotFoundPageStyled>
  );
};

export default NotFoundPage;
