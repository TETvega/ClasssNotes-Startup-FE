import { useNavigate } from "react-router-dom";
import BrutalButton from "../../../../../shared/components/ui/BrutalButton";

export const StudentRow = ({
  courseId,
  id,
  studentName,
  email,
  attendanceRatePercentage,
  attendanceRateColor,
}) => {
  const navigate = useNavigate();

  const studentId = id;

  return (
    <tr className="border-disabled-text h-[50px] border">
      <td className="px-4 py-2 sm:min-w-[240px] md:min-w-[160px] lg:min-w-[240px] xl:min-w-[300px]">
        {studentName}
      </td>
      <td className="hidden px-4 py-2 md:min-w-[230px] lg:table-cell lg:min-w-[260px] xl:min-w-[300px]">
        {email}
      </td>
      <td className="px-4 py-2 sm:min-w-[130px] md:min-w-[70px] lg:min-w-[150px] xl:min-w-[150px]">
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold text-black ${attendanceRateColor}`}
        >
          {attendanceRatePercentage}%
        </span>
      </td>
      <td className="flex justify-center px-2 py-2 sm:min-w-[150px] md:min-w-[150px] lg:min-w-[250px] xl:min-w-[268px]">
        <div className="sm:min-w-[100px] md:min-w-[100px] lg:min-w-[150px] xl:min-w-[150px]">
          <BrutalButton
            shadow={false}
            onClick={() =>
              navigate(`/attendances/${courseId}/student/${studentId}`)
            }
            className="h-8"
          >
            Ver más
          </BrutalButton>
        </div>
      </td>
    </tr>
  );
};
