import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-app/firebase-config";
import parse from "html-react-parser";

const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc?.data() && setPostInfo(doc.data());
        });
      });
    }
    fetchData();
  }, [slug]);
  console.log(postInfo);
  // if(!slug) return <NotFoundPage></NotFoundPage>
  return (
    <div className="w-[800px] mx-auto mt-5 entry-content">
      <img src={postInfo.image} alt="" />
      <h1>{postInfo?.title}</h1>
      <div>{parse(postInfo?.content || "")}</div>
    </div>
  );
};

export default PostDetailsPage;
