import { IoMdCheckmark } from "react-icons/io";

export const CenterItem = ({ center, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`mb-3 flex w-full items-center justify-between rounded-md border p-4 text-left hover:cursor-pointer ${
        isSelected
          ? "border-action-primary border-l-10 bg-green-100"
          : "border-gray-300 bg-white hover:bg-gray-50"
      }`}
    >
      <div className="min-w-0 flex-1">
        <div className="font-semibold">{center.abbreviation}</div>
        <div className="truncate text-sm text-gray-600 max-sm:hidden">
          {center.name}
        </div>
      </div>
      {isSelected && (
        <div className="text-action-primary ml-4 flex-shrink-0">
          <IoMdCheckmark size={25} />
        </div>
      )}
    </button>
  );
};
