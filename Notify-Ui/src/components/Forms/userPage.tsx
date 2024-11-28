"use client";
import * as antd from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  deleteUser,
  getAllUsers,
  getRolesApi,
  impersonationApi,
} from "../../api/api";
import CreateUser from "./createUser";
import EditUser from "./editUser";
import UpdatePassword from "./updatepassword";
import Loader from "../common/Loader";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const { Modal } = antd;
const { confirm } = Modal;
const Users: React.FC = () => {
  const [allUsers, setAllUsers] = useState<any>([]);
  const [showCreateUserModal, setShowCreateUserModal] =
    useState<boolean>(false);
  const [ShowUpdatePassword, setShowUpdatePassword] = useState<string>("");
  const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);
  const [userForEdit, setUserForEdit] = useState<object>({});
  const [rolesPermissions, setRolesPermissions] = useState<[]>([]);
  const loggedInUser: any = localStorage.getItem("loginUser");
  const router = useRouter();

  let permissions: any;
  let userId: any;
  if (loggedInUser) {
    userId = JSON.parse(loggedInUser)._id;
    permissions = JSON.parse(loggedInUser).roles[0].permissions;
  }

  useEffect(() => {
    (async () => {
      const res: any = await getAllUsers();
      if (res.status === 200) {
        setAllUsers(res.data);
      } else if (res.code === "ERR_BAD_REQUEST") {
        toast.error(res.response.data.message);
        setAllUsers([]);
      }
      const rolesData: any = await getRolesApi();
      if (rolesData.status === 200) {
        setRolesPermissions(rolesData.data);
      } else if (rolesData.code === "ERR_BAD_REQUEST") {
        toast.error(rolesData.response.data.message);
      }
    })();
  }, []);

  // search with multiple
  const [searchQuery, setSearchQuery] = useState("");
  const multipleSearch = allUsers?.filter((user: any) =>
    Object.keys(user).some((parameter) =>
      user[parameter].toString().toLowerCase().includes(searchQuery),
    ),
  );

  // pagination
  const [currentPageX, setCurrentPageX] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPageX * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const data = multipleSearch.slice(firstIndex, lastIndex);
  const npages = Math.ceil(allUsers.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  // for previous pages
  const prePage = () => {
    if (currentPageX !== firstIndex) {
      setCurrentPageX(currentPageX - 1);
    }
  };

  // for next pages
  const nextPage = () => {
    if (currentPageX !== lastIndex) {
      setCurrentPageX(currentPageX + 1);
    }
  };

  // for changed pages
  const changePage = async (id: number) => {
    setCurrentPageX(id);
  };

  // delete products model
  const showDeleteConfirm = (id: string) => {
    confirm({
      title: "Are you sure delete this User?",
      // icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteProductHandler(id);
      },
      onCancel() {},
    });
  };

  // product delete Handler
  const deleteProductHandler = async (id: string) => {
    const res: any = await deleteUser(id);
    if (res.status === 200) {
      toast.success(res.data.message);
      const remainingUsers = [...allUsers].filter((user) => {
        return user._id !== id;
      });
      setAllUsers(remainingUsers);
    } else if (res.code === "ERR_BAD_REQUEST") {
      toast.error(res.response.data.message);
    }
  };

  function editUser(value: boolean, user: object) {
    setUserForEdit(user);
    setShowEditUserModal(value);
  }

  async function impersonateManager(userId: any) {
    const res: any = await impersonationApi(userId);
    if (res.status === 200) {
      toast.success(`Login as ${res.data.name}`);
      router.push("/");
      localStorage.setItem("loginUser", JSON.stringify(res.data));
    } else if (res.code === "ERR_BAD_REQUEST") {
      toast.error(res.response.data.message);
    }
  }

  return (
    <main>
      <Breadcrumb pageName="Users" />
      <section>
        {showCreateUserModal ? (
          <CreateUser
            rolesWPermissions={rolesPermissions}
            showCreateUserModal={showCreateUserModal}
            setShowCreateUserModal={setShowCreateUserModal}
            allUsers={allUsers}
            setAllUsers={setAllUsers}
          />
        ) : null}
        {showEditUserModal ? (
          <EditUser
            rolesWPermissions={rolesPermissions}
            showEditUserModal={showEditUserModal}
            setShowEditUserModal={setShowEditUserModal}
            user={userForEdit}
            allUsers={allUsers}
          />
        ) : null}
        {ShowUpdatePassword !== "" ? (
          <UpdatePassword
            setShowUpdatePassword={setShowUpdatePassword}
            userId={ShowUpdatePassword}
          />
        ) : null}
        {/* Start coding here */}
        <div className="relative mb-4 bg-white shadow-sm dark:bg-graydark sm:rounded-lg">
          <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="w-full md:w-1/2">
              <div className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      aria-hidden="true"
                      className="text-gray-500 dark:text-gray-400 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="dark:placeholder-gray-400 block w-full rounded-lg bg-transparent p-2 pl-10 text-sm text-graydark focus:outline-none dark:text-whiter"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
              {permissions?.includes("createNewUser") ? (
                <button
                  onClick={() => setShowCreateUserModal(true)}
                  className="flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-black hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-body dark:bg-body dark:text-white dark:hover:bg-boxdark-2 dark:focus:ring-white"
                >
                  <svg
                    className="mr-2 h-3.5 w-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    />
                  </svg>
                  Create New User
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      {allUsers.length != 0 ? (
        <div className="shadow-xs w-full overflow-hidden rounded-lg">
          <div className="w-full overflow-x-auto">
            <table className="whitespace-no-wrap w-full">
              <thead>
                <tr className="border-b bg-slate-200 text-left text-sm font-semibold uppercase tracking-wide text-graydark dark:border-graydark dark:bg-boxdark dark:text-gray">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email Address</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-2 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white dark:divide-gray-3 dark:bg-body">
                {data?.map((user: any) => {
                  return (
                    <tr
                      className="text-slate-700 dark:text-whiten"
                      key={user._id}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center text-sm">
                          {/* Avatar with inset shadow */}
                          <div className="relative mr-3 hidden h-8 w-8 rounded-full md:block">
                            {/* <img
                              className="object-cover w-full h-full rounded-full"
                              src={product.images[0].url}
                              alt={product.title}
                              loading="lazy"
                            /> */}
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{user.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{user.email}</td>
                      <td className="px-4 py-3 text-sm">
                        {user.roles.map((role: any) => (
                          <span key={role._id} className="mr-2">
                            {role.name},
                          </span>
                        ))}
                      </td>
                      <td className="px-4 py-3 text-end">
                        <div className="flex items-center justify-center space-x-1 text-sm">
                          {permissions?.includes("editExistingUser") ? (
                            <button
                              onClick={() => editUser(true, user)}
                              className="dark:text-gray-400 focus:shadow-outline-gray flex items-center justify-between rounded-lg px-2 py-2 text-sm font-medium leading-5 text-graydark focus:outline-none"
                              aria-label="Edit"
                            >
                              <svg
                                className="h-5 w-5"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                          ) : null}
                          {permissions?.includes("deleteExistingUser") ? (
                            <button
                              onClick={() => showDeleteConfirm(user._id)}
                              className="dark:text-gray-400 focus:shadow-outline-gray flex items-center justify-between rounded-lg px-2 py-2 text-sm font-medium leading-5 text-red focus:outline-none"
                              aria-label="Delete"
                            >
                              <svg
                                className="h-5 w-5"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          ) : null}
                          {permissions?.includes("changePassword") ? (
                            <button
                              onClick={() => setShowUpdatePassword(user._id)}
                              className="dark:text-gray-400 focus:shadow-outline-gray flex items-center justify-between rounded-lg px-2 py-2 text-sm font-medium leading-5 text-graydark focus:outline-none"
                              aria-label="Delete"
                            >
                              <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.4453 2.75 16.5018 4.42242 17.0846 6.68694C17.1879 7.08808 17.5968 7.32957 17.9979 7.22633C18.3991 7.12308 18.6405 6.7142 18.5373 6.31306C17.788 3.4019 15.1463 1.25 12 1.25C8.27208 1.25 5.25 4.27208 5.25 8V10.0546C4.13525 10.1379 3.40931 10.348 2.87868 10.8787C2 11.7574 2 13.1716 2 16C2 18.8284 2 20.2426 2.87868 21.1213C3.75736 22 5.17157 22 8 22H16C18.8284 22 20.2426 22 21.1213 21.1213C22 20.2426 22 18.8284 22 16C22 13.1716 22 11.7574 21.1213 10.8787C20.2426 10 18.8284 10 16 10H8C7.54849 10 7.13301 10 6.75 10.0036V8ZM8 17C8.55228 17 9 16.5523 9 16C9 15.4477 8.55228 15 8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17ZM17 16C17 16.5523 16.5523 17 16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16Z"
                                />
                              </svg>
                            </button>
                          ) : null}
                          {permissions?.includes("impersonation") &&
                          userId != user._id ? (
                            <button
                              onClick={() => impersonateManager(user._id)}
                              className="dark:text-gray-400 focus:shadow-outline-gray flex items-center justify-between rounded-lg px-2 py-2 text-sm font-medium leading-5 text-graydark focus:outline-none"
                              aria-label="Delete"
                            >
                              <svg
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M20.494,25.218c0-2.852-2.312-5.164-5.164-5.164h-1.333c-0.692,0-1.253-0.561-1.253-1.253 c0-0.257,0.104-0.503,0.287-0.683c0.775-0.756,1.427-1.77,1.899-2.862c0.096,0.071,0.199,0.122,0.315,0.122 c0.749,0,1.628-1.654,1.628-2.782s-0.104-2.042-0.854-2.042c-0.088,0-0.183,0.015-0.278,0.039 c-0.053-3.058-0.826-6.873-5.495-6.873c-4.872,0-5.441,3.808-5.495,6.863c-0.068-0.013-0.138-0.028-0.201-0.028 c-0.749,0-0.853,0.914-0.853,2.042s0.879,2.782,1.628,2.782c0.092,0,0.178-0.026,0.258-0.072c0.47,1.075,1.114,2.07,1.878,2.813 c0.184,0.18,0.287,0.426,0.287,0.683c0,0.692-0.561,1.253-1.253,1.253H5.164C2.312,20.054,0,22.366,0,25.218v1.432 c0,0.9,0.73,1.631,1.631,1.631h17.232c0.902,0,1.632-0.73,1.632-1.631L20.494,25.218L20.494,25.218z" />
                                <path d="M16.34,5.886c0.417,0.923,0.715,2.059,0.84,3.465c0.309,0.19,0.539,0.498,0.729,0.869h12.883 C31.459,10.22,32,9.679,32,9.012V7.095c0-0.667-0.541-1.208-1.208-1.208L16.34,5.886L16.34,5.886z" />
                                <path d="M15.857,16.784c-0.034,0.063-0.075,0.119-0.11,0.183v1.147h15.045c0.667,0,1.208-0.541,1.208-1.207V14.99 c0-0.667-0.541-1.208-1.208-1.208H18.204C17.863,15.073,17.02,16.423,15.857,16.784z" />
                                <path d="M21.994,25.218v0.794h8.798c0.667,0,1.208-0.541,1.208-1.208v-1.917c0-0.667-0.541-1.208-1.208-1.208h-9.825 C21.613,22.704,21.994,23.915,21.994,25.218z" />
                              </svg>
                            </button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="grid border-t bg-white px-4 py-3 text-sm font-semibold uppercase tracking-wide text-graydark dark:border-gray dark:bg-boxdark dark:text-white sm:grid-cols-9">
            <span className="col-span-3 flex items-center">
              Showing {currentPageX}-{npages} of {npages}
            </span>
            <span className="col-span-2" />
            {/* Pagination */}
            <span className="col-span-4 mt-2 flex sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  <li>
                    <button
                      onClick={prePage}
                      className="focus:shadow-outline-purple rounded-md rounded-l-lg px-3 py-1 focus:outline-none"
                      aria-label="Previous"
                    >
                      <svg
                        className="h-4 w-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                  {numbers.map((n, i) => {
                    return (
                      <li key={i}>
                        <button
                          onClick={() => changePage(n)}
                          className={` ${
                            currentPageX === n
                              ? "focus:shadow-outline-purple border-boxdark bg-graydark text-gray focus:outline-none"
                              : ""
                          } rounded-md border  border-r-0 px-3  py-1 transition-colors  duration-150 `}
                        >
                          {n}
                        </button>
                      </li>
                    );
                  })}

                  <li>
                    <button
                      onClick={nextPage}
                      className="focus:shadow-outline-purple rounded-md rounded-r-lg px-3 py-1 focus:outline-none"
                      aria-label="Next"
                    >
                      <svg
                        className="h-4 w-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </span>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </main>
  );
};
export default Users;
