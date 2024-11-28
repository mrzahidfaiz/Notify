import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { updatePasswordApi } from "../../api/api";

const UpdatePassword = (props: any) => {
  const { setShowUpdatePassword, userId } = props;
  const { errors, touched, values, handleChange, handleBlur, resetForm }: any =
    useFormik({
      initialValues: {
        newPassword: "",
        repeat_newPassword: "",
      },

      validationSchema: Yup.object().shape({
        newPassword: Yup.string()
          .required("Password is a required field.")
          .min(6, "Password must be at least 6 characters"),
        repeat_newPassword: Yup.string().oneOf(
          [Yup.ref("newPassword")],
          "Passwords must match"
        ),
      }),

      onSubmit: (e: any) => {
        e.preventDefault();
      },
    });

  const updatePasswordHandler = async () => {
    const data = {
      newPassword: values.newPassword,
      userId: userId,
    };
    const res: any = await updatePasswordApi(data);
    if (res.status === 200) {
      resetForm();
      setShowUpdatePassword("");
      toast.success(res.data);
    } else if (res.code === "ERR_BAD_REQUEST") {
      resetForm();
      setShowUpdatePassword("");
      toast.error(res.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-opacity-60 z-999999">
      <div className="container max-w-screen-md mx-auto">
        <div className="bg-white rounded shadow-lg px-4 min-h-[600px] relative h-full ">
          <div className="py-5 font-bold text-black-2">
            <h1>Change your password</h1>
          </div>
          <hr className="font-bold mb-3"></hr>
          <div className="min-h-[460px]">
            <form>
              <div className="mt-4">
                <label htmlFor="new-Password">
                  New Password<span className="text-danger">*</span>
                </label>
                <input
                  autoComplete="on"
                  type="password"
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="newPassword"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Enter new password"
                  required
                />
                {errors.newPassword && touched.newPassword ? (
                  <p className="text-danger text-sm">{errors.newPassword}</p>
                ) : undefined}
              </div>
              <div className="mt-4">
                <label htmlFor="repeat-New-Password">
                  Re-Enter New Password
                </label>
                <input
                  type="password"
                  name="repeat_newPassword"
                  autoComplete="on"
                  value={values.repeat_newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="repeat_newPassword"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  placeholder="Re-Enter New Password"
                />
                {errors.repeat_newPassword && touched.repeat_newPassword ? (
                  <p className="text-danger text-sm">
                    {errors.repeat_newPassword}
                  </p>
                ) : undefined}
              </div>
            </form>
          </div>
          <button
            className="absolute top-1 right-0 p-4 hover:text-black-2"
            onClick={() => setShowUpdatePassword("")}
          >
            X
          </button>
          <button
            className="float-right p-4 text-black-2"
            onClick={updatePasswordHandler}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;