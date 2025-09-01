import { FaUniversity } from "react-icons/fa";
import BackBrutalButton from "../../../../../shared/components/ui/BackBrutalButton";

export const InfoNameCenter = ({ name = "", abv = "", img = "" }) => {
  return (
    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <BackBrutalButton />
        <div>
          {img ? (
            <div className="flex size-16 items-center justify-center overflow-hidden rounded-full border bg-white shadow-sm">
              <img
                src={img}
                alt={`Logo ${name}`}
                className="size-16 h-full w-full object-cover"
              />
            </div>
          ) : (
            <FaUniversity size={70} />
          )}
        </div>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-800">{name}</h1>
            <p className="text-sm text-gray-600">{abv}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
