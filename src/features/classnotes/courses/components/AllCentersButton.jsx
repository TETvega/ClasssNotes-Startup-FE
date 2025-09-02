import { FiBookOpen } from "react-icons/fi";
import { IoMdCheckmark } from "react-icons/io";

export const AllCentersButton = ({ isSelected, onClick }) => {
  return (
    <button
      className={`mb-4 flex w-full appearance-none items-center justify-between rounded-md p-4 text-left ${isSelected ? "border-action-primary border-l-10 bg-green-100" : "border-gray-300 bg-white hover:bg-gray-50"}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <FiBookOpen size={25} className="mr-3" />
        <div>
          <div className="font-semibold">Todos</div>
          <div className="text-sm text-gray-600 max-sm:hidden">
            Ver todas las clases
          </div>
        </div>
      </div>
      {isSelected && <IoMdCheckmark size={25} />}
    </button>
  );
};
