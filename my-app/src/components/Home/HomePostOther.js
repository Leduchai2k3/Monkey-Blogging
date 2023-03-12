import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../../button/Button";
import HomeFeatureHeader from "./HomeFeatureHeader";

const data = [
  {
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1120&q=80",
    content: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
    time: "Mar 23",
    author: " Andiez Le",
    id: 0,
  },
  {
    image:
      "https://images.unsplash.com/photo-1503437313881-503a91226402?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    content: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
    time: "Mar 23",
    author: " Andiez Le",
    id: 1,
  },
  {
    image:
      "https://images.unsplash.com/photo-1536412597336-ade7b523ecfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    content: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
    time: "Mar 23",
    author: " Andiez Le",
    id: 2,
  },
  {
    image:
      "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    content: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
    time: "Mar 23",
    author: " Andiez Le",
    id: 3,
  },
];

const HomePostOther = () => {
  return (
    <div className="mt-[50px]">
      <HomeFeatureHeader>Post other</HomeFeatureHeader>
      <div className="grid grid-cols-4 gap-[35px]">
        {data.map((item) => (
          <PostOther
            key={item.id}
            image={item.image}
            content={item.content}
            time={item.time}
            author={item.author}
          ></PostOther>
        ))}
      </div>
    </div>
  );
};
const PostOther = ({ image, content, time, author }) => {
  return (
    <div className="h-[200px] w-[100%] relative">
      <img
        src={image}
        alt="img"
        className="h-[100%] w-[100%] rounded-2xl my-5"
      />
      <Button kind={"feature"}>Kiến thức</Button>
      <NavLink to={"/"} className="mb-2 text-lg font-semibold">
        {content}
      </NavLink>
      <div className="flex gap-5 text-sm font-semibold text-[#6B6B6B]">
        <p>{time}</p>
        <p>{author}</p>
      </div>
    </div>
  );
};
export default HomePostOther;
