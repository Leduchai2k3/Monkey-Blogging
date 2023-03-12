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
import { NavLink, useNavigate } from "react-router-dom";
import FormAuthen from "./FormAuthen";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-app/firebase-config";
import { useAuth } from "../contexts/auth-context";

const schemaValidate = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address")
    .required("Please your email"),
  password: yup
    .string()
    .required("Please your password")
    .min(8, "Your password must be at least 8 characters or greater"),
});
const SignInPage = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();
  document.title = "Login";
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaValidate),
  });
  useEffect(() => {
    const errorsMessage = Object.values(errors);
    if (errorsMessage.length > 0) {
      toast.error(errorsMessage[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  const { userInfo } = useAuth();
  // console.log(userInfo);
  // console.log(auth.currentUser);

  useEffect(() => {
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Success!!!");

      navigate("/");
    } catch (error) {
      if (error.message.includes("wrong-password"))
        toast.error("It seems your password was wrong");
    }
  };
  return (
    <FormAuthen>
      <form onSubmit={handleSubmit(handleSignIn)}>
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
          You have not had an account <NavLink to={"/sign-up"}>SignUp</NavLink>
        </div>
        <Field>
          <Button
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Sign In
          </Button>
        </Field>
      </form>
    </FormAuthen>
  );
};

export default SignInPage;
