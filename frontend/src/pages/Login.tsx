import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";

import bgLogin from "../assets/bg_login.jpg";
import { useLogin } from "../hooks/useApi";

//Define type of form
interface Iform {
  email: string;
  password: string;
}

//Define type of form error
interface IformErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  // useNavigate for manual change route
  const navigate = useNavigate();
  // Create form login
  const [formData, setFormData] = useState<Iform>({
    email: "",
    password: "",
  });

  // Create state errors
  const [errors, setErrors] = useState<IformErrors>({});

  // Fetch register user using userRegister
  const { mutateAsync: loingUser } = useLogin();

  // Function handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function valid form
  const validForm = (body: Iform) => {
    const validErrors: IformErrors = {};
    if (!body.email) validErrors.email = "*** Username is required ***";
    if (!body.password) validErrors.password = "*** Password end date is required ***";

    return validErrors;
  };

  // Function handle submit
  const handleSubmit = async () => {
    const invalid: IformErrors = validForm(formData);
    setErrors(invalid);
    if (Object.keys(invalid).length === 0) {
      try {
        const data = await loingUser(formData);
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        navigate("/items");
        alert("You has been successfully loged in. ✅");
      } catch (error) {
        console.error("Error login:", error);
        alert("Failed to login. Please try again later. ❌");
      }
    }
  };

  return (
    <div
      className="hero min-h-screen relative"
      style={{
        backgroundImage: `url(${bgLogin})`,
      }}
    >
      {/* blur bg */}
      <div className="hero-overlay absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>

      {/* content */}
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md bg-white text-gray-800 p-8 sm:p-10 rounded-xl">
          <h1 className="text-xl sm:text-2xl font-bold mb-7 sm:mb-10">
            <span className="text-blue-500">Sign in</span> to Warranty Checker
          </h1>
          <div className="flex flex-col gap-3 sm:gap-5">
            <div className="flex flex-col gap-1 text-left">
              <p className="text-gray-800">Email</p>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="input input-bordered w-full h-10"
              />
              {errors.email && <p className="w-fit mt-1 text-red-500 text-xs">{errors.email}</p>}
            </div>
            <div className="flex flex-col gap-1 text-left">
              <p className="text-gray-800">Password</p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="input input-bordered w-full h-10"
              />
              {errors.password && <p className="w-fit mt-1 text-red-500 text-xs">{errors.password}</p>}
            </div>
            <button onClick={handleSubmit} className="w-full my-3 bg-green-600 text-white py-3 rounded-lg hover:opacity-80">
              Sign in
            </button>
            <p className="text-xs sm:text-sm text-gray-500">
              New to Warranty Checker?
              <Link to="/register">
                <span className="text-blue-500 cursor-pointer hover:underline"> Create an account</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
