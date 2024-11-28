import type { TreeDataNode } from "antd";

export const treeData: TreeDataNode[] = [
    {
      title: "Administration",
      key: "Administration",
      children: [
        {
          title: "Roles",
          key: "Roles",
          children: [
            {
              title: "Create New Role",
              key: "createNewRole",
            },
            {
              title: "View Roles",
              key: "viewRoles",
            },
            {
              title: "Edit Role",
              key: "editRole",
            },
            {
              title: "Delete Role",
              key: "deleteRole",
            },
          ],
        },
        {
          title: "Users",
          key: "users",
          children: [
            {
              title: "Create New User",
              key: "createNewUser",
            },
            {
              title: "View All Users",
              key: "viewAllUsers",
            },
            {
              title: "Edit User",
              key: "editExistingUser",
            },
            {
              title: "Delete User",
              key: "deleteExistingUser",
            },
            {
              title: "Login As User",
              key: "impersonation",
            },
            {
              title: "Change Password",
              key: "changePassword",
            },
          ],
        }
      ],
    },
  ];