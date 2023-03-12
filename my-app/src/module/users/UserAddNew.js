import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import Button from "../../button/Button";
import FieldCheckboxes from "../../components/action/FieldCheckBoxes";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import Input from "../../components/form/Input";
import Label from "../../components/form/Label";
import ImageUpload from "../../components/Image/ImageUpload";
import { auth, db } from "../../firebase-app/firebase-config";
import useFirebaseImg from "../../hook/useFirebaseImg";
import { userRole } from "../../utils/constants";
import { useStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";

const UserAddNew = () => {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { isValid, isSubmitting },
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

  const watchStatus = watch("status");
  const watchRole = watch("role");
  const {
    progress,
    image,
    handleDeleteImg,
    onSelectImage,
    setImage,
    setProgress,
  } = useFirebaseImg(setValue, getValues);
  const handleCreateUser = async (values) => {
    try {
      console.log(values);
      if (!isValid) return;
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await addDoc(collection(db, "users"), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.username || values.fullname, {
          lower: true,
          replacement: "",
          trim: true,
        }),
        avatar: image,
        status: useStatus.ACTIVE,
        role: userRole.USER,
        createdAt: serverTimestamp(),
      });
      toast.success("Successfully!!!");
      reset({
        fullname: "",
        username: "",
        email: "",
        password: "",
        status: 1,
        role: 1,
        createdAt: new Date(),
      });
      setImage("");
      setProgress(0);
    } catch (err) {
      console.log(err);
      toast.error("Can not create new user");
    }
  };
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <ImageUpload
          className="mx-auto"
          onChange={onSelectImage}
          progress={progress}
          image={image}
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
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
