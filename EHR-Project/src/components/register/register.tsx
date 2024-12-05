import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";


// Define the types for form inputs
interface RegisterFormInputs {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}


/* const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
});
 */

const Register = () => {
  const navigate = useNavigate(); 

  const handleSubmit = async (
    values: RegisterFormInputs,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setTimeout(() => {
      toast.success("Registration successful! Navigating...");
      localStorage.setItem("token", "dummy-token");
      setSubmitting(false);
      navigate("/add");
    }); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg bg-white shadow-lg shadow-slate-800 rounded-lg">
        <div className="border-4 border-[#415BE7] rounded-lg">
          <div className="p-8 space-y-8">
            <h2 className="text-3xl text-center text-black-900 my-5">
              Register Your Account
            </h2>
            <div className="flex items-center justify-center space-x-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="text-blue-600">Welcome!</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <Formik
              initialValues={{
                username: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
              }}
/*               validationSchema={validationSchema}
 */              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username:
                    </label>
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      className="block w-full p-3 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                      placeholder="Username"
                    />
                    <ErrorMessage
                      name="username"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email:
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="block w-full p-3 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                      placeholder="you@example.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number:
                    </label>
                    <Field
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="block w-full p-3 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                      placeholder="+0123456789"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Enter Password:
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="block w-full p-3 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                      placeholder="********"
                    />
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password:
                    </label>
                    <Field
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="block w-full p-3 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                      placeholder="********"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <NavLink
                      to="/login"
                      className="w-full px-4 py-3 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:ring-4 focus:ring-indigo-500 text-center"
                    >
                      Back
                    </NavLink>
                    <button
                      type="submit"
                      className="w-full px-4 py-3 text-white bg-[#415BE7] rounded-md hover:bg-[#263380] focus:ring-4 focus:ring-indigo-500"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Registering..." : "Register"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <Toaster position="top-center" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
