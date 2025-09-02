import { FaEye } from "react-icons/fa";

export const StudentCard = ({ name = "", handleOpenStudentModal }) => {
  return (
    <div className="flex items-center justify-between border-t border-b border-gray-200 p-4">
      <span>{name}</span>
      <div className="flex-shrink-0">
        <button
          className="w-full rounded-sm border-1 border-gray-200 p-1 text-sm hover:cursor-pointer hover:bg-gray-50"
          onClick={handleOpenStudentModal}
        >
          <span className="hidden w-full rounded-sm p-1 text-sm hover:cursor-pointer lg:block">
            Ver Detalles
          </span>
          <FaEye size={16} color="#4a5565" className="block lg:hidden" />
        </button>
      </div>
    </div>
  );
};
