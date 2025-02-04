const LoadItemForm = () => {
  return (
    <div className="container mx-auto py-10 px-10 sm:px-15 lg:px-20">
      <div className="py-5 flex flex-col gap-5 lg:px-40">
        <div className="skeleton h-8 w-1/4"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
        <hr />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <div className="skeleton h-4 w-1/6"></div>
            <div className="skeleton h-6 w-1/4"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="skeleton h-4 w-1/6"></div>
            <div className="skeleton h-6 w-1/4"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="skeleton h-4 w-1/6"></div>
            <div className="skeleton h-6 w-1/4"></div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="skeleton h-4 w-1/6"></div>
            <div className="skeleton h-20 w-full"></div>
          </div>
        </div>
        <div className="mt-10 flex justify-end gap-3">
          <div className="skeleton h-8 w-20"></div>
          <div className="skeleton h-8 w-20"></div>
          <div className="skeleton h-8 w-20"></div>
        </div>
      </div>
    </div>
  );
};
export default LoadItemForm;
