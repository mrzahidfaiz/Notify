'use client'
import * as antd from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { createRoleApi } from "../../api/api";
import { treeData } from "../../utils/allPermissions";


const { Tabs, Tree } = antd;

const CreateRole = (prop: any) => {
  const { setShowCreateRoleModal, allRoles, setAllRoles } = prop;
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);

  const onCheck = (checkedKeys: any) => {
    setPermissions(checkedKeys);
  };

  const createRoleSubmitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      name: roleName,
      permissions: permissions,
    };
    const res: any = await createRoleApi(data);
    if (res.status === 201) {
      allRoles.push(res.data);
      setAllRoles([...allRoles]);
      setRoleName("");
      setPermissions([]);
      toast.success(`Role create successfully`);
      setShowCreateRoleModal(false);
    } else if (res.code === "ERR_BAD_REQUEST") {
      toast.error(res.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-opacity-60 z-999999">
      <div className="container max-w-screen-md mx-auto">
        <div className="bg-white rounded shadow-lg px-4 relative h-full">
          <div className="py-5 font-bold text-black-2">
            <h1>Create new role</h1>
          </div>
          <hr className="font-bold mb-3" />
          <form>
            <Tabs type="card" size="large">
              <Tabs.TabPane tab="Roles" key="tab1">
                <div className="m-2 mb-73">
                  <label htmlFor="role" className="font-bold">
                    Role Name
                    <span className="text-danger text-md font-bold">*</span>
                  </label>
                  <input
                    autoFocus
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    id="role"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="Enter Role"
                    required
                  />
                  {roleName === '' ? (
                    <p className="text-danger text-sm">Role Name is Required!</p>
                  ) : undefined}
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Permissions" key="tab2">
                <Tree
                  className="text-md m-2"
                  checkable
                  showIcon
                  defaultExpandAll
                  onCheck={onCheck}
                  treeData={treeData}
                />
              </Tabs.TabPane>
            </Tabs>
            <hr className="font-bold" />
            <div className="flex justify-end items-end">
              <button
                className="p-4 text-black-2"
                onClick={() =>setShowCreateRoleModal(false)}
              >
                Cancel
              </button>
              <button
                className="p-4 text-black-2"
                onClick={createRoleSubmitHandler}
              >
                Save
              </button>
            </div>
          </form>
          <button
          className="absolute top-1 right-1 p-4 hover:text-black-2"
          onClick={() => setShowCreateRoleModal(false)}
        >
          X
        </button>
        </div>
      </div>
    </div>
  )
};

export default CreateRole;