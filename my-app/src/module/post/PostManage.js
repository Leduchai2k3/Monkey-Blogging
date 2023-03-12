import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import ActionView from "../../components/action/ActionView";
import { Pagination } from "../../components/pagination";
import Table from "../../components/table/Table";
import { db } from "../../firebase-app/firebase-config";

const PostManage = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    let result = [];
    onSnapshot(colRef, (snapshot) => {
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPost(result);
    });
  }, []);
  const handleDelete = (postId) => {
    const sigleDOc = doc(db, "posts", postId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(sigleDOc);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <div>
      <h1 className="dashboard-heading">Manage post</h1>
      <div className="flex justify-end mb-10">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg"
            placeholder="Search post..."
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        {post.map((post) => (
          <tbody key={post.title}>
            <tr>
              <td></td>
              <td>{post?.id.slice(0, 6) + "..."}</td>
              <td>
                <div className="flex items-center gap-x-3">
                  <img
                    src={post.image}
                    alt=""
                    className="w-[66px] h-[55px] rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{post.title}</h3>
                    <time className="text-sm text-gray-500">
                      {new Date(
                        post?.category.createdAt?.seconds * 1000
                      ).toLocaleDateString("vi-VI")}
                    </time>
                  </div>
                </div>
              </td>
              <td>
                <span className="text-gray-500">{post?.category?.name}</span>
              </td>
              <td>
                <span className="text-gray-500">{post?.user?.fullname}</span>
              </td>
              <td>
                <div className="flex gap-2">
                  <ActionView
                    onClick={() => {
                      navigate(`/${post.slug}`);
                    }}
                  ></ActionView>
                  <ActionEdit
                    onClick={() =>
                      navigate(`/manage/update-post?id=${post?.id}`)
                    }
                  ></ActionEdit>
                  <ActionDelete
                    onClick={() => {
                      handleDelete(post.id);
                    }}
                  ></ActionDelete>
                </div>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      <div className="mt-10">
        <Pagination></Pagination>
      </div>
    </div>
  );
};

export default PostManage;
