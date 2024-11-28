import React, { useEffect, useState } from "react";
import * as antd from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { editUserInfo } from "../../api/api";

const { Tabs, Checkbox } = antd;

interface MyComponentProps {
  rolesWPermissions: any[];
  showEditUserModal: boolean;
  setShowEditUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  allUsers: any[];
}

const EditUser: React.FC<MyComponentProps> = (prop) => {
  const {
    user,
    allUsers,
    showEditUserModal,
    setShowEditUserModal,
    rolesWPermissions,
  } = prop;
  const roleNames = rolesWPermissions.map((role: any) => role.name);
  let currentUserRoles;
  if (user.roles.length !== undefined) {
    currentUserRoles = user.roles.map((role: any) => role.name);
  } else {
    currentUserRoles = [];
  }
  const [roles, setRoles] = useState(currentUserRoles);
  const [roleIds, setRoleIds] = useState([]);

  useEffect(() => {
    let roleIds;

    if (roles.length > 0) {
      roleIds = roles.map((role: any) => {
        let values = rolesWPermissions.filter(
          (roleWPermission: any) => roleWPermission.name === role,
        );
        const ids = values.map((value: any) => value._id);
        return ids.toString();
      });
    }
    if (roleIds == undefined) {
      setRoleIds([]);
    } else {
      setRoleIds(roleIds);
    }
  }, [roles]);

  const { errors, touched, values, handleChange, handleBlur, resetForm }: any =
    useFormik({
      initialValues: {
        name: user.name,
        email: user.email,
        password: "",
        repeat_password: "",
      },

      validationSchema: Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().required().email(),
        password: Yup.string().min(6),
        repeat_password: Yup.string().oneOf(
          [Yup.ref("password")],
          "Passwords must match",
        ),
      }),

      onSubmit: (e: any) => {
        e.preventDefault();
      },
    });

  const updateUserHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      roles: roleIds,
    };
    const res: any = await editUserInfo(user._id, data);
    if (res.status === 200) {
      const index = allUsers.findIndex((obj: any) => obj._id == res.data._id);
      allUsers[index].name = res.data.name;
      allUsers[index].email = res.data.email;
      allUsers[index].roles = res.data.roles;
      resetForm();
      setRoles([]);
      toast.success(`User updated successfully`);
      setShowEditUserModal(false);
    } else if (res.code === "ERR_BAD_REQUEST") {
      resetForm();
      setRoles([]);
      setShowEditUserModal(false);
      toast.error(res.response.data.message);
    }
  };

  const onChange = (checkedValues: any) => {
    setRoles(checkedValues);
  };

  return showEditUserModal ? (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-999999 flex min-h-screen items-center justify-center bg-black bg-opacity-60">
      <div className="container mx-auto max-w-screen-md">
        <div className="relative h-full min-h-[520px]  rounded bg-white px-4 shadow-lg ">
          <div className="py-5 font-bold text-black-2">
            <h1>Update New User</h1>
          </div>
          <hr className="mb-3 font-bold" />
          <form>
            <Tabs type="card" size="large">
              <Tabs.TabPane tab="User Info" key="tab1">
                <div className="mt-4">
                  <label htmlFor="name">User Name</label>
                  <input
                    autoComplete="on"
                    autoFocus
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="name"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Enter user name"
                  />
                  {errors.name && touched.name ? (
                    <p className="text-sm text-danger">{errors.name}</p>
                  ) : undefined}
                </div>
                <div>
                  <label htmlFor="email">
                    Email Address<span className="text-danger">*</span>
                  </label>
                  <input
                    autoComplete="on"
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Enter user email"
                    required
                  />
                  {errors.email && touched.email ? (
                    <p className="text-sm text-danger">{errors.email}</p>
                  ) : undefined}
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    autoComplete="on"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="repeat-password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Enter password"
                  />
                  {errors.password && touched.password ? (
                    <p className="text-sm text-danger">{errors.password}</p>
                  ) : undefined}
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="repeat-password">Repeat Password</label>
                  <input
                    type="password"
                    name="repeat_password"
                    autoComplete="on"
                    value={values.repeat_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="password"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Enter password"
                  />
                  {errors.repeat_password && touched.repeat_password ? (
                    <p className="text-sm text-danger">
                      {errors.repeat_password}
                    </p>
                  ) : undefined}
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Roles" key="tab2" className="mb-[280px]">
                <Checkbox.Group
                  className="mt-6 flex items-center justify-evenly"
                  onChange={onChange}
                  options={roleNames}
                  defaultValue={roles}
                />
              </Tabs.TabPane>
            </Tabs>
            <hr className="mt-3 font-bold" />
            <div className="flex items-end justify-end">
              <button
                className="m-2 p-2 text-black-2"
                onClick={() => setShowEditUserModal(false)}
              >
                Cancel
              </button>
              <button
                className="m-2 p-2 text-black-2"
                onClick={updateUserHandler}
              >
                Save
              </button>
            </div>
          </form>
          <button
            className="absolute right-1 top-1 p-4 hover:text-black-2"
            onClick={() => setShowEditUserModal(false)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default EditUser;
