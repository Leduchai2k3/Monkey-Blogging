import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../../button/Button";
import Radio from "../../components/checkbox/Radio";
import { Dropdown } from "../../components/dropdown";
import Field from "../../components/field/Field";
import Input from "../../components/form/Input";
import Label from "../../components/form/Label";
import ImageUpload from "../../components/Image/ImageUpload";
import Toggle from "../../components/toggle/Toggle";
import { useAuth } from "../../contexts/auth-context";
import { db } from "../../firebase-app/firebase-config";
import useFirebaseImg from "../../hook/useFirebaseImg";
import { postStatus } from "../../utils/constants";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
const PostAddNewStyles = styled.div``;
const PostUpdate = () => {
  const [content, setContent] = useState("");
  const { userInfo } = useAuth();
  const [params] = useSearchParams();
  const postId = params.get("id");
  const [category, setCategory] = useState([]);
  const [selectcategory, setSelectCategory] = useState("");
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      status: 2,
      title: "",
      slug: "",
      category: "",
      hot: false,
      image: "",
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const { progress, image, handleDeleteImg, onSelectImage } = useFirebaseImg(
    setValue,
    getValues
  );
  useEffect(() => {
    async function getPost() {
      const colRef = doc(db, "posts", postId);
      const singleDoc = await getDoc(colRef);
      if (singleDoc.data()) {
        reset(singleDoc.data());
        setSelectCategory(singleDoc.data()?.category || "");
        setContent(singleDoc.data()?.content || "");
      }
    }
    getPost();
  }, []);
  useEffect(() => {
    async function getCategory() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapShot = await getDocs(q);
      let result = [];
      querySnapShot.forEach((data) => {
        result.push({
          id: data.id,
          ...data.data(),
        });
        setCategory(result);
      });
    }
    getCategory();
  }, []);
  useEffect(() => {
    if (!userInfo.email) return;
    async function fetchUser() {
      const colRef = collection(db, "users");
      const q = query(colRef, where("status", "==", userInfo.email));
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        setValue("users", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchUser();
  }, [setValue, userInfo.email]);
  async function handleCategory(item) {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  }

  const updatePost = async (value) => {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, { ...value, image, content });
    toast.success("Successfully");
  };
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ header: 1 }, { header: 2 }, { header: 3 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image"],
    ],
  };
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Update post</h1>
      <form onSubmit={handleSubmit(updatePost)}>
        <span>PostId: {postId}</span>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Title</Label>
            <Input control={control} name="title" required></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input control={control} name="slug"></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              className="w-[350px]"
              onChange={onSelectImage}
              progress={progress}
              image={image}
              handleDeleteImg={handleDeleteImg}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select
                placeholder={`${selectcategory.name || "Select category"}`}
              ></Dropdown.Select>
              <Dropdown.List>
                {category.length > 0 &&
                  category.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => {
                        handleCategory(item);
                      }}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectcategory?.name && (
              <span className="w-[100%] p-5 mt-5 text-sm font-medium bg-green-200 rounded-lg">
                {selectcategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div>
          <ReactQuill
            modules={modules}
            className="entry-content"
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                onClick={() => setValue("status", "approved")}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                onClick={() => setValue("status", "pending")}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                onClick={() => setValue("status", "reject")}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>

          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
        </div>
        <Button type="submit" height="52px">
          Update post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostUpdate;
