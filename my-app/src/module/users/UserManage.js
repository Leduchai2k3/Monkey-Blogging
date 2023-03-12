import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import LabelStatus from "../../components/form/LabelStatus";
import Table from "../../components/table/Table";
import { auth, db } from "../../firebase-app/firebase-config";
import { useStatus } from "../../utils/constants";
import { userRole } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";
import { deleteUser } from "firebase/auth";
import Button from "../../button/Button";

const UserManage = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(result);
    });
    // console.log(userList);
  }, []);
  const labelStatus = (status) => {
    switch (status) {
      case useStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case useStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case useStatus.BAN:
        return <LabelStatus type="reject">Ban</LabelStatus>;
      default:
        break;
    }
  };
  const role = (status) => {
    switch (status) {
      case userRole.USER:
        return <div>USER</div>;
      case userRole.MOD:
        return <div>MOD</div>;
      case userRole.ADMIN:
        return <div>ADMIN</div>;
      default:
        break;
    }
  };
  const handleDelete = (userId) => {
    deleteUser(auth, userId)
      .then(() => {
        console.log("Xóa tài khoản người dùng thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi xóa tài khoản người dùng: ", error);
      });
  };
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>

      <div className="flex justify-end mb-10">
        <Button to={"/manage/add-user"}>Add new user</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Fullname</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 &&
            userList.map((user) => (
              <tr key={user.id}>
                <td title={user.id}>{user?.id.slice(0, 6) + "..."}</td>
                <td className="whitespace-normal">
                  <div className="flex item-center gap-x-3">
                    <img
                      src={user.avatar}
                      className="object-cover w-10 rounded-md h10"
                      alt=""
                    />
                    <div className="flex-1">
                      <h3>{user.fullname}</h3>
                      <time className="text-sm text-gray-400">
                        {new Date(
                          user?.createdAt?.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
                      </time>
                    </div>
                  </div>
                </td>
                <td>{user.fullname}</td>
                <td title={user.email}>{user?.email.slice(0, 10) + "..."}</td>
                <td>{labelStatus(Number(user.status))}</td>
                <td>{role(Number(user.role))}</td>
                <td>
                  <div className="flex gap-2">
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-user?id=${user?.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => {
                        handleDelete(user.id);
                      }}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManage;
