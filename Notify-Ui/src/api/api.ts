import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signIn = async (data: any) => {
  let res;
  try {
    res = await api.post("/auth/login", data);
  } catch (error) {
    return error;
  }
  return res;
};

export const signUp = async (data: any) => {
  let res;
  try {
    res = await api.post("/tenant/register", data);
  } catch (error) {
    return error;
  }
  return res;
};

export const getAllUsers = async () => {
  let res;
  try {
    res = await api.get("/tenant/users");
  } catch (error) {
    return error;
  }
  return res;
};

export const logout = async () => {
  let res;
  try {
    res = await api.post("/auth/logout");
  } catch (error) {
    return error;
  }
  return res;
};

export const createUserApi = async (data: any) => {
  let res;
  try {
    res = await api.post("/users/register", data);
  } catch (error) {
    return error;
  }
  return res;
};

export const deleteUser = async (id: string) => {
  let res;
  try {
    res = await api.delete("/tenant/deleteUser/" + id);
  } catch (error) {
    return error;
  }
  return res;
};

export const editUserInfo = async (id: string, data: any) => {
  let res;
  try {
    res = await api.put(`/tenant/editUser/${id}`, data);
  } catch (error) {
    return error;
  }
  return res;
};

export const createRoleApi = async (data: any) => {
  let res;
  try {
    res = await api.post(`/roles/createRole`, data);
  } catch (error) {
    return error;
  }
  return res;
};

export const getRolesApi = async () => {
  let res;
  try {
    res = await api.get("/roles/getRoles");
  } catch (error) {
    return error;
  }
  return res;
};

export const updateRolesApi = async (id: string, data: any) => {
  let res;
  try {
    res = await api.put(`/roles/editRole/${id}`, data);
  } catch (error) {
    return error;
  }
  return res;
};

export const deleteRoleApi = async (id: string) => {
  let res;
  try {
    res = await api.delete(`/roles/deleteRole/${id}`);
  } catch (error) {
    return error;
  }
  return res;
};

export const updatePasswordApi = async (data: any) => {
  let res;
  try {
    res = await api.put("/users/updatePassword", data);
  } catch (error) {
    return error;
  }
  return res;
};

export const changePasswordApi = async (passwords: any) => {
  let res;
  try {
    res = await api.put("/tenant/changePassword", passwords);
  } catch (error) {
    return error;
  }
  return res;
};

export const impersonationApi = async (impId: string) => {
  let res;
  try {
    res = await api.post(`/users/impersonation/${impId}`);
  } catch (error) {
    return error;
  }
  return res;
};

export const undoImpersonationApi = async (impId: string) => {
  let res;
  try {
    res = await api.post(`/users/undoImpersonation/${impId}`);
  } catch (error) {
    return error;
  }
  return res;
};
