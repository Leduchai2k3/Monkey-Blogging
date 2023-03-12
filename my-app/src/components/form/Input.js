import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
const InputStyled = styled.input`
  border: 1px solid transparent;
  padding: ${(props) => (props ? "20px 60px 20px 20px" : "20px")};
  font-size: 20px;
  font-weight: 400;
  background-color: ${(props) => props.theme.bg_input};
  outline: none;
  border-radius: 10px;
  transition: 0.3s all;
  width: 100%;

  :focus {
    /* border: black; */
    border: 1px solid ${(props) => props.theme.focus_input};
    background-color: #fff;
  }
  ::-webkit-input-placeholder {
    color: ${(props) => props.theme.text_color};
  }
  ::-moz-input-placeholder {
    color: ${(props) => props.theme.text_color};
  }
  .input-icon {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
const DivStyled = styled.div`
  .input-icon {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Input = ({
  name = "",
  type = "text",
  hasIcon = false,
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  // console.log(field);
  return (
    <DivStyled className="relative">
      <InputStyled
        id={name}
        // name={name}
        type={type}
        placeholder={`Please enter your ${name}`}
        hasIcon={children ? true : false}
        {...field}
        {...props}
      />
      {children}
    </DivStyled>
  );
};

export default Input;
