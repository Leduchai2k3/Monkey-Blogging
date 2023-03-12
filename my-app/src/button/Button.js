import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import Spinner from "./Spinner";
const ButtonStyle = styled.button`
  padding: 0px ${(props) => props.height || "100px"};
  background-image: ${(props) => props.theme.bg_button};
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
  font-size: 24px;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  height: ${(props) => props.height || "70px"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  line-height: center;
  word-wrap: normal;
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: white;
      background-image: none;
    `}
  ${(props) =>
    props.kind === "feature" &&
    css`
      color: #6b6b6b;
      background-color: ${(props) => props.theme.bg_input};
      background-image: none;
      padding: 4px 10px;
      height: 24px;
      width: 100px;
      font-size: 14px;
      line-height: 0px;
      margin-left: unset;
      margin-right: unset;
    `}
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const Button = ({
  type = "button",
  onClick = () => {},
  children,
  to,
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <Spinner></Spinner> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <ButtonStyle type="type" {...props}>
          {child}
        </ButtonStyle>
      </NavLink>
    );
  }
  return (
    <ButtonStyle type="type" onClick={onClick} {...props}>
      {child}
    </ButtonStyle>
  );
};

export default Button;
