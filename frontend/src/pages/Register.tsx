import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

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

const Register = () => {
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
      username: "",
      password: "",
    },
  });

  // Create state for track valid status
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  // Debounced trigger email valid
  const debouncedEmail = useDebouncedCallback(async (value) => {
    setValue("email", value);
    const validStatus = await trigger("email");
    setIsEmailValid(validStatus);
  }, 500);

  // Debounced trigger username valid
  const debouncedUsername = useDebouncedCallback(async (value) => {
    setValue("username", value);
    const validStatus = await trigger("username");
    setIsUsernameValid(validStatus);
  }, 500);

  // Debounced trigger password valid
  const debouncedPassword = useDebouncedCallback(async (value) => {
    setValue("password", value);
    const validStatus = await trigger("password");
    setIsPasswordValid(validStatus);
  }, 500);

  //Create state http status error
  const [statusError, setStatusError] = useState<number | null>(null);

  // Fetch register user using userRegister
  const { mutate: registerUser } = useRegister(setStatusError);

  // Function on submit
  const onSubmit: SubmitHandler<Iform> = (data) => {
    registerUser(data);
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
          <form className="sm:px-10 md:px-28 lg:px-14 xl:px-28 2xl:px-40" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-xl lg:text-2xl font-bold py-10">
              <span className="text-blue-500">Sign up</span> to Warranty Checker
            </h1>
            <div className="flex flex-col gap-3 sm:gap-5">
              <div className="relative flex flex-col gap-1 text-left">
                <p className="font-semibold text-gray-800">
                  Email<sup>*</sup>
                </p>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full h-10"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format.",
                    },
                  })}
                  onChange={(e) => debouncedEmail(e.target.value)}
                />

                <p className="text-xs text-gray-500">Please enter your email.</p>
                {isEmailValid && <span className="absolute right-3 top-9">✅</span>}
                {errors.email && <p className="w-fit mt-1 text-red-500 text-xs py-1 px-2 bg-red-100 rounded-md">{errors.email.message}</p>}
              </div>
              <div className="relative flex flex-col gap-1 text-left">
                <p className="font-semibold text-gray-800">
                  Username<sup>*</sup>
                </p>
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered w-full h-10"
                  {...register("username", {
                    required: "Username is required.",
                    pattern: {
                      value: /^[a-zA-Z0-9]{3,20}$/,
                      message: "Invalid username format.",
                    },
                  })}
                  onChange={(e) => debouncedUsername(e.target.value)}
                />
                <p className="text-xs text-gray-500">Choose a unique username.</p>
                {isUsernameValid && <span className="absolute right-3 top-9">✅</span>}
                {errors.username && (
                  <p className="w-fit mt-1 text-red-500 text-xs py-1 px-2 bg-red-100 rounded-md">{errors.username.message}</p>
                )}
              </div>
              <div className="relative flex flex-col gap-1 text-left">
                <p className="font-semibold text-gray-800">
                  Password<sup>*</sup>
                </p>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full h-10"
                  {...register("password", {
                    required: "Password is required.",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                      message: "Password must have A-Z, a-z & 0-9.",
                    },
                  })}
                  onChange={(e) => debouncedPassword(e.target.value)}
                />
                <p className="text-xs text-gray-500">Create a strong password at least 8 characters.</p>
                {isPasswordValid && <span className="absolute right-3 top-9">✅</span>}
                {errors.password && (
                  <p className="w-fit mt-2 text-red-500 text-xs py-1 px-2 bg-red-100 rounded-md">{errors.password.message}</p>
                )}
              </div>
            </div>
            <button type="submit" className="w-full my-10 bg-black text-white py-3 rounded-lg hover:shadow-lg">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
