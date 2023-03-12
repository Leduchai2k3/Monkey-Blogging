import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Button from "../../button/Button";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import ActionView from "../../components/action/ActionView";
import LabelStatus from "../../components/form/LabelStatus";
import Table from "../../components/table/Table";
import { db } from "../../firebase-app/firebase-config";
import DashboardHeading from "../dashboard/DashboardHeading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
var debounce = require("lodash.debounce");

const CategoryManage = () => {
  const navigate = useNavigate();
  const [searchCategory, setSearchCategory] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "categories");
    const newRef = searchCategory
      ? query(
          colRef,
          where("name", ">=", searchCategory),
          where("name", "<=", searchCategory + "utf8")
        )
      : colRef;
    onSnapshot(newRef, (snapshot) => {
      let result = [];
      snapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    });
  }, [searchCategory]);
  console.log(searchCategory);
  const handleClick = async (categoryId) => {
    const sigleDOc = doc(db, "categories", categoryId);
    console.log(sigleDOc.id);
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
  const handleInputChange = debounce((e) => {
    setSearchCategory(e.target.value);
  }, 300);
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <Button height="60px" to="/manage/add-category">
          Create Category
        </Button>
      </DashboardHeading>
      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Enter your name category"
          className="px-4 py-3 border border-gray-500 rounded-lg outline-none"
          onChange={handleInputChange}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        {categories.length > 0 &&
          categories.map((data) => (
            <tbody key={data.id}>
              <tr>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>
                  <span className="italic text-gray-400">{data.slug}</span>
                </td>
                <td>
                  <LabelStatus
                    type={`${data.status === 1 ? "success" : "danger"}`}
                  >
                    Approved
                  </LabelStatus>
                </td>
                <td>
                  <div className="flex gap-2">
                    <ActionView></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-category?id=${data.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => {
                        handleClick(data.id);
                      }}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
      </Table>
    </div>
  );
};

export default CategoryManage;
