import React, { useEffect, useState } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../../button/Button";
import FieldCheckboxes from "../../components/action/FieldCheckBoxes";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import Input from "../../components/form/Input";
import Label from "../../components/form/Label";
import ImageUpload from "../../components/Image/ImageUpload";
import { db } from "../../firebase-app/firebase-config";
import useFirebaseImg from "../../hook/useFirebaseImg";
import { userRole } from "../../utils/constants";
import { useStatus } from "../../utils/constants";
import { useNavigate, useSearchParams } from "react-router-dom";

const UserUpdate = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const userId = params.get("id");
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      status: 1,
      role: 1,
      createdAt: new Date(),
    },
  });
  const imageUrl = getValues("avatar");

  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "users", userId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [userId, reset]);
  const watchStatus = watch("status");
  const watchRole = watch("role");
  const { progress, image, handleDeleteImg, onSelectImage } = useFirebaseImg(
    setValue,
    getValues
  );
  const hadnleUpdateUser = async (values) => {
    try {
      console.log(values);
      const colRef = doc(db, "users", userId);
      await updateDoc(colRef, {
        ...values,
        avatar: image,
      });
      toast.success("Successfully!!!");
      navigate("/manage/user");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <DashboardHeading
        title="Update User"
        desc="Manage your user"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(hadnleUpdateUser)}>
        <ImageUpload
          className="mx-auto"
          onChange={onSelectImage}
          progress={progress}
          image={image || imageUrl}
          handleDeleteImg={handleDeleteImg}
        ></ImageUpload>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
              required
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              required
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === useStatus.ACTIVE}
                value={useStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === useStatus.PENDING}
                value={useStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === useStatus.BAN}
                value={useStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          className="mx-auto w-[200px]"
          type="submit"
          isLoadisabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update user
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
