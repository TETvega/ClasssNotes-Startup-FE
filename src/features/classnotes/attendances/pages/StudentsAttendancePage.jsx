import { useParams } from "react-router-dom";
import { useStudentAttendances } from "../hooks/useStudentAttendances";
import { AttendancePercentage, HeaderStudents } from "../components/ui";
import { CalendarAttendance } from "../components";
import BrutalPagination from "../../../../shared/components/ui/BrutalPagination";

export const StudentAttendancePage = () => {
  const { studentId } = useParams();

  const {
    studentAttendancesDate,
    studentAttendanceStats,
    setPage,
    page,
    pageSize,
    setPageSize,
    pageSizeOptions,
    isCurrentMonth,
    setIsCurrentMonth,
  } = useStudentAttendances(studentId);

  return (
    <div className="w-full">
      <div className="mt-2 flex min-h-96 w-full flex-col rounded-lg border-2 border-gray-200 bg-white font-sans shadow-xl">
        <div className="mt-4 px-4">
          <HeaderStudents studentAttendanceStats={studentAttendanceStats} />
        </div>
        <div className="w-full pt-4">
          <AttendancePercentage
            studentAttendanceStats={studentAttendanceStats}
          />
        </div>
        <div>
          <CalendarAttendance
            studentAttendancesDate={studentAttendancesDate}
            isCurrentMonth={isCurrentMonth}
            setIsCurrentMonth={setIsCurrentMonth}
          />
        </div>
        <div className="mb-8 px-8">
          <BrutalPagination
            itemLabel={"días"}
            currentPage={page}
            pageSize={pageSize}
            totalItems={studentAttendancesDate.totalItems}
            totalPages={studentAttendancesDate.totalPages}
            hasPreviousPage={studentAttendancesDate.hasPreviousPage}
            hasNextPage={studentAttendancesDate.hasNextPage}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            pageSizeOptions={[
              ...pageSizeOptions,
              studentAttendancesDate.totalItems,
            ]}
          />
        </div>
      </div>
    </div>
  );
};
