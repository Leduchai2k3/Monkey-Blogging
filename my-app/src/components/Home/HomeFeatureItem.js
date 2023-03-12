import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Button from "../../button/Button";
import { db } from "../../firebase-app/firebase-config";
// const data = [
//   {
//     image:
//       "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1120&q=80",
//     content: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
//     time: "Mar 23 ",
//     author: "Andiez Le",
//     id: 0,
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//     content: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
//     time: "Mar 23 ",
//     author: "Andiez Le",
//     id: 1,
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1677253171057-0c60a148a11b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
//     content: "Hướng dẫn setup phòng cực chill dành cho người mới toàn tập",
//     time: "Mar 23 ",
//     author: "Andiez Le",
//     id: 2,
//   },
// ];
const HomeFeatureStyled = styled.div`
  max-height: 270px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 45px;
  margin-top: 30px;
  flex-wrap: nowrap;
  .container {
    height: 250px;
    img {
      height: 100%;
      object-fit: cover;
      min-width: 340px;
      border-radius: 15px;
      opacity: 0.8;
    }
  }
  .content {
    position: absolute;
    padding: 20px;
    top: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }
    p {
      font-size: 22px;
      color: white;
      font-weight: 600;
    }
  }
`;
const HomeFeatureItem = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
    );
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log(results);
      setPosts(results);
    });
  }, []);
  console.log(posts[0]?.fullname);
  return (
    <HomeFeatureStyled>
      {posts &&
        posts.map((data) => (
          <FeatureItem
            key={data.categoryId}
            img={data.image}
            time={"Mar 12 "}
            content={data.title}
            author={data?.user?.fullname}
            slug={data.slug}
          ></FeatureItem>
        ))}
    </HomeFeatureStyled>
  );
};

const FeatureItem = ({ img, time, content, author, slug }) => {
  return (
    <div className="container relative">
      <img src={img} alt="" />
      <div className="content">
        <div className="w-full">
          <Button kind={"feature"}>Kiến thức</Button>
          <div className="absolute flex flex-row gap-2 right-4 top-4">
            <span>{time}</span>
            <span>{author}</span>
          </div>
        </div>
        <NavLink to={slug} className="text-[22px] text-[white] font-semibold">
          {content}
        </NavLink>
      </div>
    </div>
  );
};
export default HomeFeatureItem;
