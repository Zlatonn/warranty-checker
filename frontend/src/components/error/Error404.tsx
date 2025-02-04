import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  const handleReturnHome = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center">
      <div className="container mx-auto px-4 sm:px-10 md:px-14 max-w-2xl">
        <div className="mockup-window bg-blue-500 shadow-lg">
          <div className="bg-base-200 flex justify-center px-4 py-20">
            <div className="flex flex-col items-center gap-3">
              <p className="text-6xl font-semibold">404</p>
              <p className="text-2xl ">Page Not Found</p>
              <p className="font-light">The resource requests could not be found on this server!</p>
              <button className="btn btn-link" onClick={handleReturnHome}>
                Click here to return to home page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;
