import { Link } from "react-router-dom";

import bgUser from "../assets/bg_register.jpg";

const Register = () => {
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
                <input type="text" placeholder="Email" className="input input-bordered w-full h-10" />
                <p className="text-xs text-gray-500">Please enter your email.</p>
              </div>
              <div className="flex flex-col gap-1 text-left">
                <p className="font-semibold text-gray-800">
                  Username<sup>*</sup>
                </p>
                <input type="text" placeholder="Username" className="input input-bordered w-full h-10" />
                <p className="text-xs text-gray-500">Choose a unique username.</p>
              </div>
              <div className="flex flex-col gap-1 text-left">
                <p className="font-semibold text-gray-800">
                  Password<sup>*</sup>
                </p>
                <input type="password" placeholder="Password" className="input input-bordered w-full h-10" />
                <p className="text-xs text-gray-500">Create a strong password.</p>
              </div>
            </div>
            <button className="w-full my-10 bg-black text-white py-3 rounded-lg hover:shadow-lg">Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
