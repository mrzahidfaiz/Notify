import * as antd from "antd";
import type { TreeDataNode, TreeProps } from "antd";
import { useState } from "react";
import toast from "react-hot-toast";
import { treeData } from "../../utils/allPermissions";
import { updateRolesApi } from "../../api/api";

const { Tabs, Tree } = antd;

const EditRole = (prop: any) => {
  const { showEditRoleModal, setShowEditRoleModal, role, allRoles } = prop;
  const [roleName, setRoleName] = useState(role.name);
  const [Permissions, setPermissions] = useState(role.permissions);

  const onCheck: TreeProps["onCheck"] = (checkedKeys) => {
    setPermissions(checkedKeys);
  };

  const updateRoleSubmitHandler = async (e: any) => {
    e.preventDefault();
    const data = {
      name: roleName,
      permissions: Permissions,
    };
    const res: any = await updateRolesApi(role._id, data);
    if (res.status === 200) {
      const index = allRoles.findIndex((role: any) => role._id == res.data._id);
      allRoles[index].name = res.data.name;
      allRoles[index].createAt = res.data.createAt;
      allRoles[index].permissions = res.data.permissions;
      setShowEditRoleModal(false);
      setRoleName("");
      setPermissions([]);
      toast.success("Role update successfully");
    } else if ((res.code = "ERR_BAD_REQUEST")) {
      toast.error(res.response.data.message);
    }
  };
  return showEditRoleModal ? (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-999999 flex min-h-screen items-center justify-center bg-black bg-opacity-60">
      <div className="container mx-auto max-w-screen-md">
        <div className="relative h-full rounded bg-white px-4 shadow-lg ">
          <div className="py-5 font-bold text-black-2">
            <h1>Update new role</h1>
          </div>
          <hr className="mb-3 font-bold" />
          <form>
            <Tabs type="card" size="large">
              <Tabs.TabPane tab="Roles" key="tab1">
                <div className="m-2 mb-73">
                  <label htmlFor="role" className="font-bold">
                    Role Name
                    <span className="text-md font-bold text-danger">*</span>
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
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Permissions" key="tab2">
                <Tree
                  className="text-md m-2"
                  checkable
                  showIcon
                  defaultExpandAll
                  defaultCheckedKeys={Permissions}
                  onCheck={onCheck}
                  treeData={treeData}
                />
              </Tabs.TabPane>
            </Tabs>
            <hr className="font-bold" />
            <div className="flex items-end justify-end gap-2">
              <button
                className="m-2 p-2 text-black-2"
                onClick={() => setShowEditRoleModal(false)}
              >
                Cancel
              </button>
              <button
                className="m-2 p-2 text-black-2"
                onClick={updateRoleSubmitHandler}
              >
                Save
              </button>
            </div>
          </form>
          <button
            className="absolute right-1 top-1 p-4 hover:text-black-2"
            onClick={() => setShowEditRoleModal(false)}
          >
            X
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default EditRole;
