import { useNavigate } from "react-router-dom";

const Error401 = () => {
  const navigate = useNavigate();
  const handleReturnLogin = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center">
      <div className="container mx-auto px-4 sm:px-10 md:px-14 max-w-2xl">
        <div className="mockup-window bg-blue-500 shadow-lg">
          <div className="bg-base-200 flex justify-center px-4 py-20">
            <div className="flex flex-col items-center gap-3">
              <p className="text-6xl font-semibold">401</p>
              <p className="text-2xl ">Unauthorized </p>
              <p className="font-light">You are not authorized to view this page. Please log in to access it.</p>
              <button className="btn btn-link" onClick={handleReturnLogin}>
                Click here to return to login again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error401;
