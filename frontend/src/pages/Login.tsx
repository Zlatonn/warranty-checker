import { Link } from "react-router-dom";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import { useLogin } from "../hooks/useApi";

import Error404 from "../components/error/Error404";
import Error500 from "../components/error/Error500";
import ErrorNetwork from "../components/error/ErrorNetwork";
import ErrorUnexpected from "../components/error/ErrorUnexpected";

import bgLogin from "../assets/bg_login.jpg";
import eyeIcon from "../assets/eye-solid.svg";
import eyeSlashIcon from "../assets/eye-slash-solid.svg";

//Define type of form
interface Iform {
  email: string;
  password: string;
}

const Login = () => {
  // Register form to validation and submission
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<Iform>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Debounced trigger email valid
  const debouncedEmail = useDebouncedCallback((value) => {
    setValue("email", value);
    trigger("email");
  }, 500);

  // Debounced trigger password valid
  const debouncedPassword = useDebouncedCallback((value) => {
    setValue("password", value);
    trigger("password");
  }, 500);

  // Create state isDisplayPassword
  const [isDisplayPassword, setIsDisplaypassword] = useState(false);

  // Create state http status error
  const [statusError, setStatusError] = useState<number | null>(null);

  // Fetch register user using userRegister
  const { mutate: loingUser } = useLogin(setStatusError);

  // Function handle submit
  const onSubmit: SubmitHandler<Iform> = (data) => {
    loingUser(data);
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
        <form className="max-w-md bg-white text-gray-800 p-8 sm:p-10 rounded-xl" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-xl sm:text-2xl font-bold mb-7 sm:mb-10">
            <span className="text-blue-500">Sign in</span> to Warranty Checker
          </h1>
          <div className="flex flex-col gap-3 sm:gap-5">
            <div className="flex flex-col gap-1 text-left">
              <p className="text-gray-800">Email</p>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full h-10"
                {...register("email", {
                  required: "*** Email is required ***",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "*** Invalid email format ***",
                  },
                })}
                onChange={(e) => debouncedEmail(e.target.value)}
              />
              {errors.email && <p className="w-fit mt-1 text-red-500 text-xs">{errors.email.message}</p>}
            </div>
            <div className="relative flex flex-col gap-1 text-left">
              <p className="text-gray-800">Password</p>
              <input
                type={isDisplayPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full h-10"
                {...register("password", {
                  required: "*** Password is required ***",
                })}
                onChange={(e) => debouncedPassword(e.target.value)}
              />
              <span className="absolute top-10 right-3 w-5 cursor-pointer" onClick={() => setIsDisplaypassword(!isDisplayPassword)}>
                <img src={isDisplayPassword ? eyeIcon : eyeSlashIcon} alt={isDisplayPassword ? "eyeIcon" : "eyeSlashIcon"} />
              </span>
              {errors.password && <p className="w-fit mt-1 text-red-500 text-xs">{errors.password.message}</p>}
            </div>
            <button type="submit" className="w-full my-3 bg-green-600 text-white py-3 rounded-lg hover:opacity-80">
              Sign in
            </button>
            <p className="text-xs sm:text-sm text-gray-500">
              New to Warranty Checker?
              <Link to="/register">
                <span className="text-blue-500 cursor-pointer hover:underline"> Create an account</span>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
