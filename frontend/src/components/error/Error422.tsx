import { useNavigate } from "react-router-dom";

const Error422 = () => {
  const navigate = useNavigate();
  const handleReturnHome = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="w-full min-h-screen bg-[#f5f7f9] flex justify-center items-center">
      <div className="container mx-auto px-4 sm:px-10 md:px-14 max-w-2xl">
        <div className="mockup-window bg-blue-500 shadow-lg">
          <div className="bg-base-200 flex justify-center px-4 py-20">
            <div className="flex flex-col items-center gap-3">
              <p className="text-6xl font-semibold">422</p>
              <p className="text-2xl ">Unprocessable Entity</p>
              <p className="font-light">The server understands the request but cannot process it. Please check the input and try again.</p>
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
export default Error422;
