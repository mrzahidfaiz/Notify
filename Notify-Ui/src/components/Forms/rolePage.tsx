"use client";
import * as antd from "antd";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../common/Loader";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { deleteRoleApi, getRolesApi } from "../../api/api";
import CreateRole from "./createRole";
import EditRole from "./editRole";

const { Modal } = antd;
const { confirm } = Modal;

const Roles: React.FC = () => {
  const [allRoles, setAllRoles] = useState<any>([]);
  const [showCreateRoleModal, setShowCreateRoleModal] =
    useState<boolean>(false);
  const [showEditRoleModal, setShowEditRoleModal] = useState<boolean>(false);
  const [roleForEdit, setRoleForEdit] = useState<object>({});
  const loggedInUser: any = localStorage.getItem("loginUser");
  let permissions: any;
  if (loggedInUser) {
    permissions = JSON.parse(loggedInUser).roles[0].permissions;
  }

  useEffect(() => {
    (async () => {
      const res: any = await getRolesApi();
      if (res.status === 200) {
        setAllRoles(res.data);
      } else if (res.code === "ERR_BAD_REQUEST") {
        toast.error(res.response.data.message);
        setAllRoles([]);
      }
    })();
  }, []);

  // search with multiple
  const [searchQuery, setSearchQuery] = useState("");
  const multipleSearch = allRoles?.filter((role: any) =>
    Object.keys(role).some((parameter) =>
      role[parameter].toString().toLowerCase().includes(searchQuery),
    ),
  );

  // pagination
  const [currentPageX, setCurrentPageX] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPageX * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = multipleSearch.slice(firstIndex, lastIndex);
  const npages = Math.ceil(allRoles.length / recordsPerPage);
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
      title: "Are you sure delete this role?",
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
    const res: any = await deleteRoleApi(id);
    if (res.status === 200) {
      toast.success(res.data.message);
      const remainingRoles = [...allRoles].filter((role) => {
        return role._id !== id;
      });
      setAllRoles(remainingRoles);
    } else if (res.code === "ERR_BAD_REQUEST") {
      toast.error(res.response.data.message);
    }
  };

  function editRole(value: boolean, role: object) {
    setRoleForEdit(role);
    setShowEditRoleModal(value);
  }
  return (
    <main>
      <Breadcrumb pageName="Roles" />
      <section>
        {showCreateRoleModal ? (
          <CreateRole
            showCreateRoleModal={showCreateRoleModal}
            setShowCreateRoleModal={setShowCreateRoleModal}
            allRoles={allRoles}
            setAllRoles={setAllRoles}
          />
        ) : null}
        {showEditRoleModal ? (
          <EditRole
            showEditRoleModal={showEditRoleModal}
            setShowEditRoleModal={setShowEditRoleModal}
            role={roleForEdit}
            allRoles={allRoles}
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
              {permissions?.includes("createNewRole") ? (
                <button
                  onClick={() => setShowCreateRoleModal(true)}
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
                  Create New Role
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      {allRoles.length != 0 ? (
        <div className="shadow-xs w-full overflow-hidden rounded-lg">
          <div className="w-full overflow-x-auto">
            <table className="whitespace-no-wrap w-full">
              <thead>
                <tr className="border-b bg-slate-200 text-left text-sm font-semibold uppercase tracking-wide text-graydark dark:border-graydark dark:bg-boxdark dark:text-gray">
                  <th className="px-4 py-3 text-center">Role Name</th>
                  <th className="px-4 py-3 text-center">Creation Time</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white dark:divide-gray-3 dark:bg-body">
                {records?.map((role: any) => {
                  return (
                    <tr
                      className="text-slate-700 dark:text-whiten"
                      key={role._id}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center text-sm">
                          <div>
                            <p className="font-semibold">{role.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-sm">
                        {role.createdAt}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center space-x-4 text-sm">
                          {permissions?.includes("editRole") ? (
                            <button
                              onClick={() => editRole(true, role)}
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
                          {permissions?.includes("deleteRole") ? (
                            <button
                              onClick={() => showDeleteConfirm(role._id)}
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
export default Roles;
