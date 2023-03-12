import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Button from "../../button/Button";
import HomeFeatureHeader from "./HomeFeatureHeader";

const HomeNewestStyled = styled.div`
  margin-top: 50px;
`;

const data = [
  {
    image:
      "https://images.unsplash.com/photo-1622086674522-79a0089e9d02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    content: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
    time: "Mar 23",
    author: " Andiez Le",
    id: 0,
  },
  {
    image:
      "https://images.unsplash.com/photo-1632334804712-d8046e6f0ce2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80",
    content: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
    time: "Mar 23",
    author: " Andiez Le",
    id: 1,
  },
  {
    image:
      "https://images.unsplash.com/photo-1495627009230-9e30e647c7cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80",
    content: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
    time: "Mar 23",
    author: " Andiez Le",
    id: 2,
  },
];
const HomeNewest = () => {
  return (
    <HomeNewestStyled>
      <HomeFeatureHeader>Newest update</HomeFeatureHeader>
      <div className="flex flex-row gap-x-10 mt-7">
        <div className="max-w-[48%] flex flex-col gap-3">
          <NavLink className="h-[400px] w-full">
            <img
              src="https://images.unsplash.com/photo-1606126979000-725298f43bff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="img"
              className="rounded-2xl h-[100%] w-full"
            />
          </NavLink>
          <Button kind={"feature"} to={"/"}>
            Kiến thức
          </Button>
          <NavLink to={"/"} className="text-[22px] font-semibold">
            Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
          </NavLink>
          <div className="flex gap-5 -translate-y-2 text-sm font-semibold text-[#6B6B6B]">
            <p>Mar 23</p>
            <p>Andiez Le</p>
          </div>
        </div>
        <div className="bg-[#F3EDFF] grid grid-rows-3 border border-gray-200 rounded-md">
          {data.map((item) => (
            <NewItem
              key={item.id}
              image={item.image}
              content={item.content}
              time={item.time}
              author={item.author}
            ></NewItem>
          ))}
        </div>
      </div>
    </HomeNewestStyled>
  );
};

const NewItem = ({ image, content, time, author }) => {
  return (
    <div className="h-[130px] px-5 py-7 flex gap-4 border-t border-gray-200 ">
      <NavLink to={"/"} className="w-[60%]">
        <img
          src={image}
          alt="img"
          className="h-[130px] w-[100%] object-cover rounded-lg"
        />
      </NavLink>
      <div className="flex flex-col gap-3">
        <Button kind={"feature"} to={"/"}>
          Kiến thức
        </Button>
        {/* <a href=""></a> */}
        <NavLink to={"/"} className="text-lg font-semibold">
          {content}
        </NavLink>
        <div className="flex gap-5 text-sm font-semibold text-[#6B6B6B]">
          <p>{time}</p>
          <p>{author}</p>
        </div>
      </div>
    </div>
  );
};
export default HomeNewest;
