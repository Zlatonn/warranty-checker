import { Link } from "react-router-dom";

import bgLogin from "../assets/bg_login.jpg";

const Login = () => {
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
              <p className="text-gray-800">Username</p>
              <input type="text" placeholder="Username" className="input input-bordered w-full h-10" />
            </div>
            <div className="flex flex-col gap-1 text-left">
              <p className="text-gray-800">Password</p>
              <input type="password" placeholder="Password" className="input input-bordered w-full h-10" />
            </div>
            <button className="w-full my-3 bg-green-600 text-white py-3 rounded-lg hover:opacity-80">Sign in</button>
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
