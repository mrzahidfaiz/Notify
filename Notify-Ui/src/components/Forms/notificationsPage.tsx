'use client'
import Head from 'next/head';
import React, { useState } from 'react'
import CreateNotification from './createNotification';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';

const data: any = [];

const Notification = () => {
  const allUsers: any = [];

  const [openNotificationPopup, setOpenNotificationPopup] = useState(false);

  // search with multiple
  const [searchQuery, setSearchQuery] = useState("");
  const multipleSearch = allUsers?.filter((user: any) =>
    Object.keys(user).some((parameter) =>
      user[parameter].toString().toLowerCase().includes(searchQuery)
    )
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



  return (
      <main>
        <Head>
          <title>Mass Notification</title>
          {/* <meta charset="UTF-8" /> */}
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="author" content="notify" />
        </Head>
        <Breadcrumb pageName="Mass Notification" />
        {openNotificationPopup ? <CreateNotification setOpenNotificationPopup={setOpenNotificationPopup} /> : null}

        <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3 mb-5">
          <button
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-black rounded-lg bg-meta-7 hover:bg-primary-800 focus:ring-4 focus:ring-body dark:bg-body dark:hover:bg-boxdark-2 dark:text-white focus:outline-none dark:focus:ring-white"
            onClick={() => setOpenNotificationPopup(true)}
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
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
            Create New Mass Notifications
          </button>
          {/*  */}
          <button
            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-black rounded-lg bg-meta-3 hover:bg-primary-800 focus:ring-4 focus:ring-body dark:bg-body dark:hover:bg-boxdark-2 dark:text-white focus:outline-none dark:focus:ring-white"
          >
            <svg
              className="h-3.5 w-3.5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M21.3687 13.5827C21.4144 13.3104 21.2306 13.0526 20.9583 13.0069C20.686 12.9612 20.4281 13.1449 20.3825 13.4173L21.3687 13.5827ZM12 20.5C7.30558 20.5 3.5 16.6944 3.5 12H2.5C2.5 17.2467 6.75329 21.5 12 21.5V20.5ZM3.5 12C3.5 7.30558 7.30558 3.5 12 3.5V2.5C6.75329 2.5 2.5 6.75329 2.5 12H3.5ZM12 3.5C15.3367 3.5 18.2252 5.4225 19.6167 8.22252L20.5122 7.77748C18.9583 4.65062 15.7308 2.5 12 2.5V3.5ZM20.3825 13.4173C19.7081 17.437 16.2112 20.5 12 20.5V21.5C16.7077 21.5 20.6148 18.0762 21.3687 13.5827L20.3825 13.4173Z" />
              <path d="M20.4716 2.42157V8.07843H14.8147" strokeLinecap="round" strokeLinejoin="round" />

            </svg>
            Refresh
          </button>
        </div>

        <div className="relative bg-white shadow-sm mb-4 dark:bg-graydark sm:rounded-lg">
          {/* A */}
          <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
              <div className="flex items-center text-graydark font-bold dark:text-white ">
                Mass Notifications
              </div>
            </div>

          </div>
          {/* B */}
          <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
              <div className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
                    className="block w-full p-2 pl-10 text-sm text-graydark rounded-lg bg-transparent focus:outline-none dark:placeholder-gray-400 dark:text-whiter"
                    placeholder="Search..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-graydark uppercase border-b dark:border-graydark bg-slate-200 dark:text-gray-400 dark:bg-boxdark">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email Address</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-2 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-3 dark:bg-body">
                {data?.map((user: any) => {
                  return (
                    <tr
                      className="text-gray-700 dark:text-whiten"
                      key={user._id}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center text-sm">
                          {/* Avatar with inset shadow */}
                          <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
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
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-1 text-sm">
                          <button
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                            aria-label="Edit"
                          >
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>

                          <button
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                            aria-label="Delete"
                          >
                            <svg
                              className="w-5 h-5"
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

                          <button
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
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

                          <button
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
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
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="grid px-4 py-3 text-sm font-semibold tracking-wide text-graydark uppercase border-t dark:border-gray bg-white sm:grid-cols-9 dark:text-white dark:bg-boxdark">
            <span className="flex items-center col-span-3">
              Showing {currentPageX}-{npages} of {npages}
            </span>
            <span className="col-span-2" />
            {/* Pagination */}
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  <li>
                    <button
                      onClick={prePage}
                      className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Previous"
                    >
                      <svg
                        className="w-4 h-4 fill-current"
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
                          className={` ${currentPageX === n
                            ? "focus:shadow-outline-purple border-boxdark bg-graydark text-gray focus:outline-none"
                            : ""
                            } px-3 py-1  transition-colors duration-150  border border-r-0  rounded-md `}
                        >
                          {n}
                        </button>
                      </li>
                    );
                  })}

                  <li>
                    <button
                      onClick={nextPage}
                      className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next"
                    >
                      <svg
                        className="w-4 h-4 fill-current"
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
      </main>
  )
}

export default Notification