const LoadItemList = () => {
  return (
    <div className="container mx-auto py-10 px-10 sm:px-15 lg:px-20">
      <div className=" mt-10 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
        <div className="skeleton h-32 bg-gray-100"></div>
        <div className="skeleton h-32 bg-gray-100"></div>
        <div className="skeleton h-32 bg-gray-100"></div>
        <div className="skeleton h-32 bg-gray-100"></div>
        <div className="skeleton h-32 bg-gray-100"></div>
        <div className="skeleton h-32 bg-gray-100"></div>
      </div>
    </div>
  );
};
export default LoadItemList;
