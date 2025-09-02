import { useParams, useNavigate } from "react-router-dom";
import { useBreadcrumbStore } from "../../../../shared/store/useBreadcrumbStore";
import { useStudents } from "../hooks";
import { StudentsPageSkeleton } from "../components/skeleton";
import { Breadcrumb } from "../../../../shared/components/ui";
import { StudentsPageHeader, StudentsSelected } from "../components";
import { StudentsFilters } from "../components/StudentsFilters";
import { StudentsTable } from "../components/ui";
import BrutalPagination from "../../../../shared/components/ui/BrutalPagination";

export const StudentsPage = () => {
  const { currentCourse } = useBreadcrumbStore();
  const { courseId } = useParams();
  const navigate = useNavigate();

  const {
    handleSelectStudent,
    setSelectedStudents,
    handleSelectAllStudents,
    setIsFiltering,
    setSearchTerm,
    setPage,
    setPageSize,
    handleFilterByStudentsState,
    handleFilterByActivitiesState,
    handleDeleteStudents,
    handleChangeStudentsState,
    students,
    isLoading,
    selectedStudents,
    isFiltering,
    pageSizeOptions,
    page,
    pageSize,
    error,
    studentType,
    activityType,
    isDeleting,
    isChangingState,
  } = useStudents(courseId || currentCourse?.id);

  if (isLoading) return <StudentsPageSkeleton pageSize={pageSize} />;
  if (error || !students)
    return navigate("/not-found", {
      state: { message: "Ocurrió un error al cargar los estudiantes." },
    });

  return (
    <main className="w-full">
      <div>
        <Breadcrumb />
        <StudentsPageHeader students={students?.items} />
        <div className="flex flex-col gap-6">
          <StudentsFilters
            setIsFiltering={setIsFiltering}
            handleSearch={setSearchTerm}
            handleFilterByStudentsState={handleFilterByStudentsState}
            handleFilterByActivitiesState={handleFilterByActivitiesState}
            studentType={studentType}
            activityType={activityType}
          />
          {selectedStudents.length > 0 && (
            <StudentsSelected
              selectedStudents={selectedStudents}
              setSelectedStudents={setSelectedStudents}
              handleDeleteStudents={handleDeleteStudents}
              handleChangeStudentsState={handleChangeStudentsState}
              isDeleting={isDeleting}
              isChangingState={isChangingState}
            />
          )}
          <div className="overflow-x-auto overflow-y-auto rounded-lg border border-gray-200 bg-white">
            <StudentsTable
              students={students?.items || []}
              handleSelectStudent={handleSelectStudent}
              selectedStudents={selectedStudents}
              handleSelectAllStudents={handleSelectAllStudents}
              isFiltering={isFiltering}
              setIsFiltering={setIsFiltering}
              pageSize={pageSize}
              handleDeleteStudents={handleDeleteStudents}
              handleChangeStudentsState={handleChangeStudentsState}
              isDeleting={isDeleting}
              isChangingState={isChangingState}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <BrutalPagination
          currentPage={page}
          pageSize={pageSize}
          totalItems={students.totalItems}
          totalPages={students.totalPages}
          hasPreviousPage={students.hasPreviousPage}
          hasNextPage={students.hasNextPage}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[...pageSizeOptions, students.totalItems]}
          itemLabel="estudiantes"
        />
      </div>
    </main>
  );
};
