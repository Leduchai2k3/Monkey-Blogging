import React, { useEffect, useState } from "react";
import Input from "../components/form/Input";
import Label from "../components/form/Label";
import { useForm } from "react-hook-form";
import IconEyeOpen from "../components/icon/IconEyeOpen";
import IconEyeClose from "../components/icon/IconEyeClose";
import Field from "../components/field/Field";
import Button from "../button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase-app/firebase-config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import FormAuthen from "./FormAuthen";
import { userRole, useStatus } from "../utils/constants";
const schemaValidate = yup.object({
  fullname: yup.string().required("Please your fullname"),
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please your email"),
  password: yup
    .string()
    .required("Please your password")
    .min(8, "Your password must be at least 8 characters or greater"),
});
const SignUpPage = () => {
  document.title = "SignUp";
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidate),
  });

  const handleSignUp = async (values) => {
    if (!isValid) return;
    await createUserWithEmailAndPassword(auth, values.email, values.password);
    await updateProfile(auth.currentUser, {
      displayName: values.fullname,
      photoURL:
        "https://images.unsplash.com/photo-1678097116910-d43c8a2c0307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    });

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
      avatar:
        "https://images.unsplash.com/photo-1678097116910-d43c8a2c0307?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",

      status: useStatus.ACTIVE,
      role: userRole.USER,
      createdAt: serverTimestamp(),
    });
    toast.success("Successfully!!!");
    navigate("/");
  };
  const [togglePassword, setTogglePassword] = useState(false);
  useEffect(() => {
    const errorsMessage = Object.values(errors);
    if (errorsMessage.length > 0) {
      toast.error(errorsMessage[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  return (
    <FormAuthen>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <Field>
          <Label htmlFor="fullname">Fullname</Label>
          <Input type="text" name="fullname" control={control} />
        </Field>
        <Field>
          <Label htmlFor="email">Email Address</Label>
          <Input type="email" name="email" control={control} />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type={togglePassword ? "text" : "password"}
            name="password"
            control={control}
            hasIcon
          >
            {togglePassword ? (
              <IconEyeOpen
                className="input-icon"
                onClick={() => setTogglePassword(false)}
              ></IconEyeOpen>
            ) : (
              <IconEyeClose
                className="input-icon"
                onClick={() => setTogglePassword(true)}
              ></IconEyeClose>
            )}
          </Input>
        </Field>
        <div className="have-account">
          You already have an account? <NavLink to={"/sign-in"}>Login</NavLink>
        </div>
        <Field>
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Sign Up
          </Button>
        </Field>
      </form>
    </FormAuthen>
  );
};

export default SignUpPage;
