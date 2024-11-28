import * as antd from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { createUserApi } from "../../api/api";
import { treeData } from "../../utils/allPermissions";
import { Interface } from "readline";

const { Tabs, Checkbox, Tree } = antd;
interface MyComponentProps {
  showCreateUserModal: boolean;
  rolesWPermissions: any[];
  allUsers: any[];
  setShowCreateUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  setAllUsers: React.Dispatch<React.SetStateAction<any[]>>;
}
const CreateUser: React.FC<MyComponentProps> = (prop) => {
  const {
    showCreateUserModal,
    setShowCreateUserModal,
    allUsers,
    setAllUsers,
    rolesWPermissions,
  } = prop;
  const [roles, setRoles] = useState([]);
  const [roleIds, setRoleIds] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const rolesData = rolesWPermissions.map((rol: any) => rol.name);

  useEffect(() => {
    let roleIds: any;
    if (roles.length > 0) {
      roleIds = roles.map((role: any) => {
        let values = rolesWPermissions.filter(
          (roleWPermission: any) => roleWPermission.name === role,
        );
        const ids = values.map((value: any) => value._id);
        return ids.toString();
      });
    }
    if (roleIds === undefined) {
      setRoleIds([]);
    } else {
      setRoleIds(roleIds);
    }

    changePermissionHandler();
  }, [roles]);

  const changePermissionHandler = async () => {
    let permissions: any;
    if (roles.length > 0) {
      permissions = roles.map((role: any) => {
        let values = rolesWPermissions.filter(
          (roleWPermission: any) => roleWPermission.name === role,
        );
        const permissionsData = values.map((value: any) => value.permissions);
        return permissionsData;
      });
    }
    if (permissions !== undefined) {
      const flatenedArray = await permissions.flat(Infinity);
      const refinedAray: any = [...new Set(flatenedArray)];
      setPermissions(refinedAray);
    }
  };

  const { errors, touched, values, handleChange, handleBlur, resetForm }: any =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        repeat_password: "",
      },

      validationSchema: Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().required().email(),
        password: Yup.string().required().min(6),
        repeat_password: Yup.string().oneOf(
          [Yup.ref("password")],
          "Passwords must match",
        ),
      }),

      onSubmit: (e: any) => {
        e.preventDefault();
      },
    });

  const createUserHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      roles: roleIds,
    };
    const res: any = await createUserApi(data);
    if (res.status === 201) {
      allUsers.push(res.data);
      setAllUsers([...allUsers]);
      resetForm();
      toast.success(`User Registered successfully`);
      setShowCreateUserModal(false);
    } else if (res.code === "ERR_BAD_REQUEST") {
      toast.error(res.response.data.message);
    }
  };

  const onChange = (checkedValues: any) => {
    if (checkedValues != 2) {
      setRoles(checkedValues);
    }
  };

  let tree;
  if (!roleIds.length) {
    tree = "";
  } else {
    tree = (
      <Tree
        checkable
        className="text-md m-2"
        defaultExpandAll
        defaultCheckedKeys={permissions}
        treeData={treeData}
      />
    );
  }

  return showCreateUserModal ? (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-999999 flex min-h-screen items-center justify-center bg-black bg-opacity-60">
      <div className="container mx-auto max-w-screen-md">
        <div className="relative h-full min-h-[600px] rounded bg-white px-4 shadow-lg ">
          <div className="py-5 font-bold text-black-2">
            <h1>Create New User</h1>
          </div>
          <hr className="mb-3 font-bold"></hr>
          <div className="min-h-[460px]">
            <Tabs
              defaultActiveKey="1"
              size="large"
              type="card"
              items={[
                {
                  key: "1",
                  label: "User Info",
                  children: (
                    <form>
                      <div className="mt-4">
                        <label htmlFor="name">User Name</label>
                        <input
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
                          <p className="text-sm text-danger">
                            {errors.password}
                          </p>
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
                    </form>
                  ),
                },
                {
                  key: "2",
                  label: "Roles",
                  children: (
                    <Checkbox.Group
                      className="mt-6 flex items-center justify-evenly"
                      options={rolesData}
                      onChange={onChange}
                    />
                  ),
                },
                {
                  key: "3",
                  label: "Permissions",
                  children: tree,
                },
              ]}
            />
          </div>
          <hr className="font-bold" />
          <button
            className="absolute -top-1 right-0 p-3 hover:text-black-2"
            onClick={() => setShowCreateUserModal(false)}
          >
            X
          </button>
          <button
            disabled={!values.name || !values.email || !values.password}
            className="float-right p-4 text-black-2 hover:cursor-pointer"
            onClick={createUserHandler}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CreateUser;
