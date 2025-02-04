import { Link } from "react-router-dom";
import { ChangeEvent, useState } from "react";

import { useRegister } from "../hooks/useApi";

import ErrorNetwork from "../components/error/ErrorNetwork";
import Error404 from "../components/error/Error404";
import Error500 from "../components/error/Error500";
import ErrorUnexpected from "../components/error/ErrorUnexpected";

import bgUser from "../assets/bg_register.jpg";

//Define type of form
interface Iform {
  email: string;
  username: string;
  password: string;
}

//Define type of form error
interface IformErrors {
  email?: string;
  username?: string;
  password?: string;
}

const Register = () => {
  // Create state form register
  const [formData, setFormData] = useState<Iform>({
    email: "",
    username: "",
    password: "",
  });

  // Create state form errors
  const [formErrors, setFormErrors] = useState<IformErrors>({});

  //Create state http status error
  const [statusError, setStatusError] = useState<number | null>(null);

  // Fetch register user using userRegister
  const { mutate: registerUser } = useRegister(setStatusError);

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
    if (!body.email) validErrors.email = "*** Email is required ***";
    if (!body.username) validErrors.username = "*** Username is required ***";
    if (!body.password) validErrors.password = "*** Password end date is required ***";

    return validErrors;
  };

  // Function handle submit
  const handleSubmit = () => {
    const invalid: IformErrors = validForm(formData);
    setFormErrors(invalid);
    if (Object.keys(invalid).length === 0) {
      registerUser(formData);
    }
  };

  // Return JSX with error condition
  if (statusError !== null) {
    switch (statusError) {
      case 0:
        return <ErrorNetwork />;
      case 404:
        return <Error404 />;
      case 500:
        return <Error500 />;
      default:
        return <ErrorUnexpected />;
    }
  }

  //Return JSX with normal condition
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">
      {/* Image Section */}
      <div
        className="w-full lg:w-1/2 h-52 lg:h-auto"
        style={{
          backgroundImage: `url(${bgUser})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2">
        <div className="w-full px-5">
          <div className="flex justify-end gap-1 sm:gap-3 text-gray-500 text-sm py-5">
            <p className="">Already have an account?</p>
            <Link to="/login">
              <span className="underline cursor-pointer hover:text-blue-500">Sign in</span>
            </Link>
          </div>
          <div className="sm:px-10 md:px-28 lg:px-14 xl:px-28 2xl:px-40">
            <h1 className="text-xl lg:text-2xl font-bold py-10">
              <span className="text-blue-500">Sign up</span> to Warranty Checker
            </h1>
            <div className="flex flex-col gap-3 sm:gap-5">
              <div className="flex flex-col gap-1 text-left">
                <p className="font-semibold text-gray-800">
                  Email<sup>*</sup>
                </p>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="input input-bordered w-full h-10"
                />
                <p className="text-xs text-gray-500">Please enter your email.</p>
                {formErrors.email && <p className="w-fit mt-1 text-red-500 text-xs">{formErrors.email}</p>}
              </div>
              <div className="flex flex-col gap-1 text-left">
                <p className="font-semibold text-gray-800">
                  Username<sup>*</sup>
                </p>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className="input input-bordered w-full h-10"
                />
                <p className="text-xs text-gray-500">Choose a unique username.</p>
                {formErrors.username && <p className="w-fit mt-1 text-red-500 text-xs">{formErrors.username}</p>}
              </div>
              <div className="flex flex-col gap-1 text-left">
                <p className="font-semibold text-gray-800">
                  Password<sup>*</sup>
                </p>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="input input-bordered w-full h-10"
                />
                <p className="text-xs text-gray-500">Create a strong password.</p>
                {formErrors.password && <p className="w-fit mt-1 text-red-500 text-xs">{formErrors.password}</p>}
              </div>
            </div>
            <button onClick={handleSubmit} className="w-full my-10 bg-black text-white py-3 rounded-lg hover:shadow-lg">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
