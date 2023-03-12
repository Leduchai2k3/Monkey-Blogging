import React from "react";
import styled from "styled-components";

const LabelStyled = styled.label`
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  color: ${(props) => props.theme.black};
  cursor: pointer;
`;

const Label = ({ name, children, ...props }) => {
  return (
    <LabelStyled htmlFor={name} {...props}>
      {children}
    </LabelStyled>
  );
};

export default Label;
