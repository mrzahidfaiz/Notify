import React from "react";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { withFormik, FormikProps, Form, Field } from 'formik';
import { changePasswordApi } from "../../api/api";

interface FormValues {
  password: string;
  newPassword: string;
  repeat_newPassword: string;
}


let setShowChangePassword: any;

const InnerForm = (props: FormikProps<FormValues> & any) => {
  setShowChangePassword = props.setShowChangePassword
  const { touched, errors, isSubmitting } = props;
  return (
    <div className="min-h-screen px-2 bg-black flex items-center justify-center fixed top-0 bottom-0 left-0 right-0 bg-opacity-60 z-999999">
      <div className="container max-w-screen-md mx-auto">
        <div className="bg-white rounded shadow-lg px-4 relative h-full ">
          <div className="py-5 font-bold text-black-2">
            <h1>Change your password</h1>
          </div>
          <hr className="mb-3" /> 
          <Form>
            <div className="mt-4">
              <label htmlFor="password">
                Current password<span className="text-danger">*</span>
              </label>
              <Field
                autoComplete="on"
                autoFocus
                type="password"
                name="password"
                id="password"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                placeholder="Enter your password"
              />
              {errors.password && touched.password ? (
                <p className="text-danger text-sm">{errors.password}</p>
              ) : undefined}
            </div>
            <div className="mt-4">
              <label htmlFor="new-Password">
                New Password<span className="text-danger">*</span>
              </label>
              <Field
                autoComplete="on"
                type="password"
                name="newPassword"
                id="newPassword"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                placeholder="Enter new password"
              />
              {errors.newPassword && touched.newPassword ? (
                <p className="text-danger text-sm">{errors.newPassword}</p>
              ) : undefined}
            </div>
            <div className="mt-4">
              <label htmlFor="repeat-New-Password">
                Re-Enter New Password
              </label>
              <Field
                type="password"
                name="repeat_newPassword"
                id="repeat_newPassword"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-Field dark:text-white dark:focus:border-primary"
                placeholder="Re-Enter New Password"
              />
              {errors.repeat_newPassword && touched.repeat_newPassword ? (
                <p className="text-danger text-sm">
                  {errors.repeat_newPassword}
                </p>
              ) : undefined}
            </div>
            <button
              className="absolute top-1 right-0 p-4 hover:text-black-2"
              onClick={() => setShowChangePassword(false)}
            >
              X
            </button>
            <hr className="mt-3"></hr>
            <div className="flex justify-end items-end align-middle">

              <button
                className="p-2 m-2 text-black-2 "
                onClick={() => setShowChangePassword(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="p-2 m-2 text-black-2"
              >
                Save
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
};

interface MyFormProps {
  message: string;
}

const ChangePassword: any = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => {
    return {
      password: '',
      newPassword: '',
      repeat_newPassword: ''
    };
  },
  validationSchema: Yup.object().shape({
    password: Yup.string().required('Current Password is a required field.'),
    newPassword: Yup.string()
      .required("Password is a required field.")
      .min(6, "Password must be at least 6 characters."),
    repeat_newPassword: Yup.string().oneOf(
      [Yup.ref("newPassword")],
      "Passwords must match."
    ).required('Enter Repeat Password.'),
  }),

  handleSubmit: async (values) => {
    const data = {
      password: values.password,
      newPassword: values.newPassword
    }
    const res: any = await changePasswordApi(data);
    if (res.status === 200) {
      values.password = '',
        values.newPassword = '',
        values.repeat_newPassword = '',
        setShowChangePassword(false);
      toast.success(res.data);
    } else if (res.code === "ERR_BAD_REQUEST") {
      toast.error(res.response.data.message.toString());
      return null;
    }
  }

})(InnerForm);

export default ChangePassword;