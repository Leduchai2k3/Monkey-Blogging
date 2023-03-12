import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../button/Button";
import { useAuth } from "../../../contexts/auth-context";
import { auth } from "../../../firebase-app/firebase-config";
const liHeader = [
  {
    url: "/",
    text: "Home",
    id: 0,
  },
  {
    url: "/blog",
    text: "Blog",
    id: 1,
  },
  {
    url: "/contact",
    text: "Contact",
    id: 2,
  },
];

const HeaderHomePageStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 40px;
  .header-left {
    display: flex;
    align-items: center;
    gap: 25px;
  }
  .header-right {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 60px;
    .input {
      height: 100%;
      width: 320px;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        border: 1px solid ${(props) => props.theme.border};
        /* padding: 18px 20px; */
        border-radius: 8px;
        outline: none;
        transition: 0.3s all;
        background-color: ${(props) => props.theme.bg_input};
        padding: 20px 60px 20px 20px;
      }
      input:focus {
        /* border: black; */
        border: 1px solid ${(props) => props.theme.focus_input};
        background-color: #fff;
      }
      input::-webkit-input-placeholder {
        color: ${(props) => props.theme.text_color};
      }
      input::-moz-input-placeholder {
        color: ${(props) => props.theme.text_color};
      }
      .icon-search {
        position: absolute;
        top: 50%;
        right: 25px;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }
    .button {
      height: 60px;
      padding: 15px 60px;
      font-weight: 500;
    }
  }
`;
function getLastName(name) {
  const length = name?.split(" ")?.length;
  return name?.split(" ")[length - 1];
}
const HeaderHomePage = () => {
  const { userInfo } = useAuth();
  // console.log(userInfo);
  // console.log(userInfo);
  // console.log(userInfo?.displayName);
  return (
    <HeaderHomePageStyled className="header">
      <div className="header-left">
        <NavLink to={"/"}>
          <img srcSet="logo.png 4x" alt="monkey-blogging" />
        </NavLink>
        <ul className="flex flex-row gap-[40px] font-semibold text-[20px]">
          {liHeader.map((li) => (
            <li key={li.id}>
              <NavLink to={li.url}>{li.text}</NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="header-right">
        <div className="input">
          <input type="text" placeholder="Search posts..." />
          <svg
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="icon-search"
          >
            <ellipse
              cx="7.66669"
              cy="7.05161"
              rx="6.66669"
              ry="6.05161"
              stroke="#999999"
              strokeWidth="1.5"
            />
            <path
              d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
              stroke="#999999"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
              stroke="#999999"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {!auth.currentUser ? (
          <Button className="button" type="button" to={"/sign-up"}>
            Sign Up
          </Button>
        ) : (
          <Button className="button" type="button" to={"/dashboard"}>
            DashBoard
          </Button>
        )}
      </div>
    </HeaderHomePageStyled>
  );
};

export default HeaderHomePage;
