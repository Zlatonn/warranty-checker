import { Link } from "react-router-dom";

import bgHome from "/images/bg_home.webp";
import imgWarranty from "/images/warranty.webp";
import imgCustomer from "/images/customer.webp";
import imgUser from "/images/user.webp";

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${bgHome})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md text-center">
            <h1 className="mb-5 text-2xl sm:text-3xl font-semibold text-white">welcome to</h1>
            <h1 className="mb-5 text-4xl sm:text-5xl font-semibold text-white">Warranry Checker</h1>
            <p className="mb-5 text-sm sm:text-md">
              Enjoy a seamless warranty verification experience. Our platform simplifies the process, ensuring you have instant access to
              crucial warranty details whenever you need them.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/login">
                <button className="btn btn-primary hover:underline">Sign In</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Our feature section */}
      <div className="bg-[#f5f7f9] pt-10 pb-32 px-10 sm:px-14 lg:px-20 flex flex-col gap-5">
        <h1 className="text-3xl sm:text-4xl pt-20 pb-10 font-bold text-gray-700 text-center">Our Features</h1>
        <div className="text-md sm:text-lg font-bold grid grid-cols-1 gap-5 xl:gap-8 md:grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-col gap-5 bg-white p-10 rounded-xl cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-sky-100 hover:bg-blue-50 duration-500">
            <p className="text-center">✅ Check Warranty Instantly</p>
            <p className="text-sm sm:text-md text-gray-400 font-normal">
              Verify your product’s warranty status in seconds with our easy-to-use platform.
            </p>
          </div>
          <div className="flex flex-col gap-5 bg-white p-10 rounded-xl cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-sky-100 hover:bg-blue-50 duration-500">
            <p className="text-center">ℹ️ Stay Informed</p>
            <p className="text-sm sm:text-md text-gray-400 font-normal">
              Get detailed information about your product’s warranty coverage to ensure you're always prepared.
            </p>
          </div>
          <div className="flex flex-col gap-5 bg-white p-10 rounded-xl cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-sky-100 hover:bg-blue-50 duration-500">
            <p className="text-center">⏰ Save Time and Effort</p>
            <p className="text-sm sm:text-md text-gray-400 font-normal">
              No more searching through paperwork—simply enter your product details, and we’ll do the rest.
            </p>
          </div>
          <div className="flex flex-col gap-5 bg-white p-10 rounded-xl cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-sky-100 hover:bg-blue-50 duration-500">
            <p className="text-center">👨🏼‍💼 For Customers and Retailers</p>
            <p className="text-sm sm:text-md text-gray-400 font-normal">
              Whether you’re checking your own products or assisting a customer, our tool is built for everyone.
            </p>
          </div>
          <div className="flex flex-col gap-5 bg-white p-10 rounded-xl cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-sky-100 hover:bg-blue-50 duration-500">
            <p className="text-center">🔐 Secure and Reliable</p>
            <p className="text-sm sm:text-md text-gray-400 font-normal">
              Your data is safe with us. We prioritize privacy and accuracy for a seamless experience.
            </p>
          </div>
          <div className="flex flex-col gap-5 bg-white p-10 rounded-xl cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-sky-100 hover:bg-blue-50 duration-500">
            <p className="text-center">📱 Accessible Anywhere</p>
            <p className="text-sm sm:text-md text-gray-400 font-normal">
              Access our platform from any device, anytime, ensuring convenience at your fingertips.
            </p>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white py-10 px-10 sm:px-14 lg:px-20 flex flex-col gap-5 mb-20">
        <h1 className="text-3xl sm:text-4xl pt-20 pb-10 font-bold text-gray-700 text-center">About</h1>
        <div className="flex flex-col items-center gap-10 sm:px-14 md:px-24 lg:px-0 lg:flex-row lg:justify-between ">
          <div className="w-full card card-compact bg-base-100 shadow-xl cursor-pointer group">
            <figure className="w-full h-60">
              <img src={imgWarranty} alt="warranty" className="object-cover w-full h-full group-hover:scale-110 duration-500" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Who We Are</h2>
              <p className="text-lg text-gray-500">Your trusted warranty verification platform.</p>
            </div>
          </div>
          <div className="w-full card card-compact bg-base-100 shadow-xl cursor-pointer group">
            <figure className="w-full h-60">
              <img src={imgCustomer} alt="customer" className="object-cover w-full h-full group-hover:scale-110 duration-500" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Our Mission</h2>
              <p className="text-lg text-gray-500">Simplifying warranty tracking for everyone.</p>
            </div>
          </div>
          <div className="w-full card card-compact bg-base-100 shadow-xl cursor-pointer group">
            <figure className="w-full h-60">
              <img src={imgUser} alt="user" className="object-cover w-full h-full group-hover:scale-110 duration-500" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Why Choose Us</h2>
              <p className="text-lg text-gray-500">Fast, reliable, and user-friendly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer section */}
      <footer className="footer footer-center bg-[#f5f7f9] text-base-content p-10 ">
        <aside>
          <p className="text-nowrap sm:text-lg text-gray-500">
            Copyright © {new Date().getFullYear()} Warranty Checker.All right reserved.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Home;
