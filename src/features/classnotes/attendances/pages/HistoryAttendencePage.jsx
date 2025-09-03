import { Breadcrumb } from "../../../../shared/components/ui";
import { AttendanceSummary, StudentTable } from "../components/ui";
import { useAttendancesHistory } from "../hooks";
import { AttendanceSummarySkeleton, StudentTableSkeleton } from "../components/skeleton";

export const HistoryAttendencePage = () => {
  const {
    currentCourse,
    searchTerm,
    page,
    courseStats,
    studentStats,
    isLoading,
    pageSize,
    pageSizeOptions,
    setPageSize,
    setSearchTerm,
    setPage,
  } = useAttendancesHistory();

  return (
    <div className="w-full">
      {isLoading ? (
        <AttendanceSummarySkeleton />
      ) : (
        <>
          <Breadcrumb />
          <AttendanceSummary stats={courseStats} />
        </>
      )}
      {isLoading ? (
        <StudentTableSkeleton />
      ) : (
        <StudentTable
          currentCourse={currentCourse}
          studentStats={studentStats}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          page={page}
          pageSizeOptions={pageSizeOptions}
          setPage={setPage}
          setPageSize={setPageSize}
          totalPages={studentStats?.totalPages}
          pageSize={pageSize}
          totalItems={studentStats?.totalItems}
          hasPreviousPage={studentStats?.hasPreviousPage}
          hasNextPage={studentStats?.hasNextPage}
        />
      )}
    </div>
  );
};
