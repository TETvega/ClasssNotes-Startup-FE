import BackBrutalButton from "../../../../shared/components/ui/BackBrutalButton";

export const InfoNameCourse = ({ abv = "", name = "" }) => {
  return (
    <div className="flex flex-col items-start gap-2 p-3 sm:flex-row sm:items-center">
      <BackBrutalButton className="mr-5" />
      <div className="bg-secondary-bg mr-5 rounded-lg px-4 py-2 text-3xl font-bold text-white">
        {abv}
      </div>
      <div className="mr-6 text-3xl text-gray-800">{name}</div>
    </div>
  );
};
