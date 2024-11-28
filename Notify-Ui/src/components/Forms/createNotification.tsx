import React, { useState } from 'react'
import { MultiSelect } from 'react-multi-select-component';


const CreateNotification = (prop: any) => {
  const { setOpenNotificationPopup } = prop;
  const [Users, setUsers] = useState([]);
  const [target, setTarget] = useState([]);
  const [currentFruit, setCurrentFruit] = useState('');
  const  [message, setMessage] = useState('');

  const optionsUser = [
    { label: "Ali", value: "Ali" },
    { label: "Usman", value: "usman" },
    { label: "Rehman", value: "Rehman"},
  ];
  const optionsTarget = [
    { label: "SMS", value: "sms" },
    { label: "Whatsapp", value: "whatsapp" },
    { label: "In-App Notification", value: "inAppNotification"},
  ];

  const messageHandler = (e: any) => {
    setMessage(e.target.value)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-opacity-60 z-999999">
      <div className="container max-w-screen-md mx-auto">
        <div className="bg-white rounded shadow-lg px-4  min-h-[600px] relative ">
          <button
            onClick={() => setOpenNotificationPopup(false)}
            className="absolute top-3.5 right-3.5 p-1.5  hover:text-black-2"
          >
            X
          </button>
          <div className="py-5 font-bold text-black-2">
            <h1>Create New Mess Notifications</h1>
          </div>
          <hr className="font-bold mb-3" />
          <div className="m-2">
            <label htmlFor="user" className="font-bold">
              User
              <span className="text-danger text-md font-bold">*</span>
            </label>
            <MultiSelect
              options={optionsUser}
              value={Users}
              onChange={setUsers}
              labelledBy="Select"
            />
          </div>
          <div className="m-2">
            <label htmlFor="depart" className="font-bold">
              Department
              <span className="text-danger text-md font-bold">*</span>
            </label>
            <input
              autoFocus
              type="text"
              id="depart"
              disabled
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              placeholder="Enter Depart"
              required
            />
          </div>
          <div className="m-2">
            <label htmlFor="severity" className="font-bold">
              Severity
              <span className="text-danger text-md font-bold">*</span>
            </label>
            <select
              className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              onChange={(e) => setCurrentFruit(e.target.value)}
              value={currentFruit}
            >
              <option value=""></option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warn">Warn</option>
              <option value="error">Error!</option>
            </select>
          </div>
          <div className="m-2">
            <label htmlFor="target" className="font-bold">
              Target Notifiers
              <span className="text-danger text-md font-bold">*</span>
            </label>
            <MultiSelect
              options={optionsTarget}
              value={target}
              onChange={setTarget}
              labelledBy="Select"
            />
          </div>
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Message
            </label>
            <textarea
              rows={6}
              placeholder="Type your message"
              value={message}
              onClick={(e) => messageHandler(e)}
              className="w-full rounded border-[1.5px] min-h-[135px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <hr className="font-bold" />
          <div className='flex flex-row justify-end gap-2 py-2'>
            <button
              className="p-2 text-black-2 bg-meta-1 rounded-md shadow-2 dark:bg-opacity-50"
              onClick={() => setOpenNotificationPopup(false)}
            >
              Cancel
            </button>
            <button
              className="p-2 text-black-2 bg-meta-3 rounded-md shadow-2"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNotification;