import { Link } from "react-router-dom";

// props type
interface Props {
  id: number;
  itemName: string;
  serialNumber: string;
  remainDays: number;
  isWarranty: "warranty" | "nearExpire" | "expired";
}

const Item = ({ id, itemName, serialNumber, remainDays, isWarranty }: Props) => {
  return (
    <Link to={`/edit/${id}`}>
      <div
        className={`flex justify-between p-3 border-[1px] rounded-xl cursor-pointer hover:bg-[#f5f7f9] hover:shadow-lg hover:-translate-y-1 duration-500`}
      >
        {/* Left content */}
        <div className="flex flex-col justify-between gap-2 sm:gap-3">
          <p className="text-sm text-gray-700">serial: {serialNumber}</p>
          <h1 className="text-xl text-blue-500 font-semibold">{itemName}</h1>
          <div className="flex items-center gap-2">
            <div
              className={`p-2 rounded-full ${
                isWarranty === "warranty" ? "bg-green-500" : isWarranty === "nearExpire" ? "bg-yellow-500" : "bg-red-500"
              }`}
            ></div>
            <p
              className={`text-lg ${
                isWarranty === "warranty" ? "text-green-500" : isWarranty === "nearExpire" ? "text-yellow-500" : "text-red-500"
              }`}
            >
              {isWarranty === "warranty" ? "warranty" : isWarranty === "nearExpire" ? "near expired" : "expired"}
            </p>
          </div>
        </div>
        {/* right content */}
        <div className="flex flex-col justify-between items-end gap-3">
          <p
            className={`text-xs text-white py-1 px-2 rounded-lg ${
              isWarranty === "warranty" ? "bg-green-500" : isWarranty === "nearExpire" ? "bg-yellow-500" : "bg-red-500"
            }`}
          >
            {Math.abs(remainDays)} days {isWarranty === "expired" ? "ago" : "left"}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default Item;
