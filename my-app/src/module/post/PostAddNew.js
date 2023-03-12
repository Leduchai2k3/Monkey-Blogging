import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import Label from "../../components/form/Label";
import Input from "../../components/form/Input";
import { postStatus } from "../../utils/constants";
import ImageUpload from "../../components/Image/ImageUpload";
import useFirebaseImg from "../../hook/useFirebaseImg";
import Toggle from "../../components/toggle/Toggle";
import { Dropdown } from "../../components/dropdown";
import { db } from "../../firebase-app/firebase-config";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  // getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "../../contexts/auth-context";
var slugify = require("slugify");

const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { userInfo } = useAuth();
  // console.log(userInfo);
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
  const {
    progress,
    image,
    handleDeleteImg,
    onSelectImage,
    setImage,
    setProgress,
  } = useFirebaseImg(setValue, getValues);
  const [category, setCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const addPostHandler = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title, { lower: true });
    cloneValues.status = Number(values.status);
    console.log(values);
    const colRef = collection(db, "posts");
    await addDoc(colRef, {
      ...cloneValues,
      image,
      // id: userInfo.uid,
      createAt: userInfo.uid,
    });
    toast.success("Successfully!!!");
    reset({
      status: 2,
      title: "",
      slug: "",
      category: "",
      hot: false,
    });
    setSelectCategory({});
    setImage("");
    setProgress(0);
  };
  useEffect(() => {
    async function fetchUser() {
      if (!userInfo.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", userInfo.email)
      );
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchUser();
  }, [setValue, userInfo]);
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapShot = await getDocs(q);
      const result = [];
      querySnapShot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategory(result);
    }
    getData();
  }, []);
  const handleCategory = async (item) => {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
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
                placeholder={`${selectCategory.name || "Select category"}`}
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
            {selectCategory?.name && (
              <span className="w-[100%] p-5 mt-5 text-sm font-medium bg-green-200 rounded-lg">
                {selectCategory?.name}
              </span>
            )}
          </Field>
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
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};
export default PostAddNew;
