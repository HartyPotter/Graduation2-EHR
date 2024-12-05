import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { NavLink } from "react-router-dom";
import ToggleSwitch from "./toggleswitch"; 



interface LoginFormInputs {
  email: string;
  password: string;
  rememberMe: boolean; 
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function LoginForm() {
  // Handle form submission
  const handleSubmit = async (values: LoginFormInputs) => {
    try {
      const response = await axios.post("/api/v1/auth/login", values);
      toast.success("Login successful!");
      console.log("Response:", response.data);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      toast.error("Login failed");
      console.error("Error in Login:", error);
    }
  };

  // Handle forgot password click
  const handleForgotPassword = () => {
    toast.success("Reset link sent to email");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-lg bg-white shadow-lg shadow-slate-800 rounded-lg">
        <div className="border-4 border-[#415BE7] rounded-lg">
          <div className="p-8 space-y-8">
            <h2 className="text-3xl text-center text-black-900 my-5">
              Log In To Your Account
            </h2>
            <div className="flex items-center justify-center space-x-4">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="text-blue-600">Welcome Back!</span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>

            <Formik
              initialValues={{ email: "", password: "", rememberMe: false }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form className="space-y-6">
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
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password:
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

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <ToggleSwitch
                        id="rememberMe"
                        checked={values.rememberMe}
                        onChange={(checked) => setFieldValue("rememberMe", checked)}
                      />
                      <span className="ml-2 text-sm text-gray-700">Remember me</span>
                    </label>
                    <NavLink
                      to="#"
                      onClick={handleForgotPassword}
                      className="text-gray-500 hover:text-black"
                    >
                      Forgot Password?
                    </NavLink>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-3 text-white bg-[#415BE7] rounded-md hover:bg-[#263380] focus:ring-4 focus:ring-indigo-500"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-700">
                Don't have an account?{" "}
                <NavLink to="/register" className="text-blue-500 hover:text-blue-700">
                  Register
                </NavLink>
              </span>
            </div>

            {/* React Hot Toast notifications */}
            <Toaster position="top-center" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
