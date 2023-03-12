import React from "react";
import styled from "styled-components";

const FieldStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  /* max-width: 600px; */
  margin-left: auto;
  margin-right: auto;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Field = ({ children }) => {
  return <FieldStyled>{children}</FieldStyled>;
};

export default Field;
