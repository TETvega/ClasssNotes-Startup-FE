import { useParams } from "react-router-dom";
import { IoMdSave } from "react-icons/io";
import { FiFilter, FiChevronDown } from "react-icons/fi";
import { MailCheck, MailPlus, UsersRound } from "lucide-react";
import { useGradeActivity } from "../hooks";
import { GradeActivitySkeleton } from "../components/skeleton";
import { Breadcrumb, NotFound } from "../../../../shared/components/ui";
import { TagActivityIcon } from "../../tags/components/ui";
import { formatDate } from "../../../../shared/utils";
import BrutalSearchBar from "../../../../shared/components/ui/BrutalSearchBar";
import BrutalButton from "../../../../shared/components/ui/BrutalButton";
import BrutalPagination from "../../../../shared/components/ui/BrutalPagination";
import { GradeSelectedModal, SendFeedbackModal } from "../components/modals";

export const GradeActivityPage = () => {
  const { activityId } = useParams();
  const {
    activity,
    tag,
    selectedStudents,
    scores,
    feedbacks,
    searchTerm,
    filterOption,
    isFilterOpen,
    currentItems,
    totalItems,
    totalPages,
    pageSize,
    currentPage,
    hasPreviousPage,
    hasNextPage,
    isModalOpen1,
    isModalOpen2,
    currentStudentName,
    gradeSelectedFormik,
    feedbackFormik,
    isLoading,
    allStudents,
    pageSizeOptions,
    handleSelectAll,
    handleSelectStudent,
    handleScoreChange,
    handleSaveScores,
    handleSearch,
    handlePageChange,
    handlePageSizeChange,
    handleOpenFeedbackModal,
    handleReset,
    setIsFilterOpen,
    setFilterOption,
    setIsModalOpen1,
    setIsModalOpen2,
  } = useGradeActivity(activityId);

  // Calcular el índice base para la numeración continua
  const baseIndex = (currentPage - 1) * pageSize;

  // Mostrar el skeleton de carga
  if (isLoading || !activity) return <GradeActivitySkeleton />;

  return (
    <div className="w-full">
      {/* Navegación */}
      <Breadcrumb />

      {/* Contenido */}
      <div className="outline-disabled-text-bg mt-4 rounded-lg bg-gray-50 p-4 outline-2 sm:p-6">
        {/* Encabezado de la actividad */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
              {activity.name}
            </h1>
            <span>
              {/* Renderizar etiqueta de la actividad */}
              {TagActivityIcon(tag.icon, tag.colorHex, 4, tag.name)}
            </span>
          </div>
          <p className="mt-1 text-xs text-gray-600 sm:text-sm">
            Fecha de calificación: {formatDate(activity.qualificationDate)}
          </p>
          <p className="mt-2 text-xs text-gray-700 sm:text-sm">
            {activity.description}
          </p>
        </div>

        {/* Sección de calificaciones */}
        <div className="mt-6">
          {/* Titulo */}
          <h2 className="mb-2 text-lg font-semibold text-gray-800 sm:text-xl">
            Calificaciones
          </h2>

          {/* Barra de herramientas */}
          <div className="mb-4 flex flex-col flex-wrap gap-3 sm:flex-row">
            {/* Buscador */}
            <div className="w-full flex-grow sm:w-auto">
              <BrutalSearchBar
                placeholder="Buscar estudiante..."
                onSearch={handleSearch}
                initialValue={searchTerm}
                buttonText="Buscar"
              />
            </div>

            {/* Filtro */}
            <div className="relative w-full sm:w-auto">
              <button
                className="flex w-full items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <FiFilter className="text-gray-500" />
                <span className="truncate">{filterOption}</span>
                <FiChevronDown className="text-gray-500" />
              </button>

              {isFilterOpen && (
                <div className="ring-opacity-5 absolute right-0 z-10 mt-1 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black sm:w-56">
                  <div className="py-1">
                    {[
                      "Todos los estudiantes",
                      "Estudiantes seleccionados",
                      "Pendientes por calificar",
                    ].map((option) => (
                      <button
                        key={option}
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          filterOption === option
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700"
                        } hover:bg-gray-100`}
                        onClick={() => {
                          setFilterOption(option);
                          setIsFilterOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Botón de calificar seleccionados */}
            <div className="w-full sm:w-full md:w-full lg:w-auto xl:w-auto">
              <BrutalButton
                variant="icon"
                icon={<UsersRound size={20} />}
                disabled={selectedStudents.length === 0}
                className="h-full w-full px-4 text-gray-500"
                shadow={false}
                onClick={() => setIsModalOpen1(true)}
              >
                Calificar Seleccionados ({selectedStudents.length})
              </BrutalButton>
            </div>
          </div>

          {/* Lista de estudiantes */}
          <div className="w-full overflow-x-auto">
            {currentItems.length > 0 ? (
              <>
                {/* Versión normal: Tabla */}
                <div className="hidden min-w-full rounded-lg border border-gray-300 lg:block">
                  <table className="min-w-full divide-y divide-gray-200">
                    {/* Encabezado de la tabla */}
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="w-12 px-3 py-3">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                            checked={selectedStudents.length === allStudents.length}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th
                          scope="col"
                          className="w-12 px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          #
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Estudiante
                        </th>
                        <th
                          scope="col"
                          className="hidden px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase md:table-cell"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Calificación
                        </th>
                        <th
                          scope="col"
                          className="px-1 py-3 text-center text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Retroalimentación
                        </th>
                      </tr>
                    </thead>
                    {/* Cuerpo de la tabla */}
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {currentItems.map((student, index) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="py-4 pl-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-blue-600"
                              checked={selectedStudents.includes(student.id)}
                              onChange={() => handleSelectStudent(student.id)}
                            />
                          </td>
                          <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                            {baseIndex + index + 1}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                            {student.name}
                          </td>
                          <td className="hidden px-6 py-4 text-sm whitespace-nowrap text-gray-500 md:table-cell">
                            {student.email}
                          </td>
                          <td className="px-6 py-4 text-right text-sm whitespace-nowrap text-gray-500">
                            <div className="flex items-center justify-end">
                              <input
                                type="number"
                                min="0"
                                max={activity.maxScore}
                                className="w-15 rounded-md border border-gray-300 px-2 py-1 text-center"
                                style={{
                                  WebkitAppearance: "none",
                                  MozAppearance: "textfield",
                                }}
                                value={scores[student.id] || ""}
                                onInput={(e) => {
                                  let value = e.target.value;
                                  value = value.replace(/[^0-9]/g, "");
                                  if (Number(value) > activity.maxScore) {
                                    value = activity.maxScore.toString();
                                  }
                                  e.target.value = value;
                                }}
                                onChange={(e) =>
                                  handleScoreChange(student.id, e.target.value)
                                }
                              />
                              <span className="ml-1 text-gray-500">
                                / {activity.maxScore}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                            <span className="flex items-center justify-center">
                              <BrutalButton
                                variant="icon"
                                icon={
                                  feedbacks[student.id] && feedbacks[student.id].trim() !== "" ? (
                                    <MailCheck size={20} />
                                  ) : (
                                    <MailPlus size={20} />
                                  )
                                }
                                disabled={!scores[student.id]}
                                className="h-9 w-16 text-gray-500"
                                shadow={false}
                                onClick={() => handleOpenFeedbackModal(student.id)}
                              />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Versión móvil: Tarjetas */}
                <div className="mt-4 space-y-4 lg:hidden">
                  {currentItems.map((student, index) => (
                    <div
                      key={student.id}
                      className="rounded-lg border border-gray-300 bg-white p-4 shadow-sm"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                            checked={selectedStudents.includes(student.id)}
                            onChange={() => handleSelectStudent(student.id)}
                          />
                          <span className="font-medium text-gray-900">
                            {student.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          #{baseIndex + index + 1}
                        </span>
                      </div>
                      <p className="mb-2 text-xs text-gray-500">{student.email}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <input
                            type="number"
                            min="0"
                            max={activity.maxScore}
                            className="w-14 rounded-md border border-gray-300 px-2 py-1 text-center"
                            style={{
                              WebkitAppearance: "none",
                              MozAppearance: "textfield",
                            }}
                            value={scores[student.id] || ""}
                            onInput={(e) => {
                              let value = e.target.value;
                              value = value.replace(/[^0-9]/g, "");
                              if (Number(value) > activity.maxScore) {
                                value = activity.maxScore.toString();
                              }
                              e.target.value = value;
                            }}
                            onChange={(e) =>
                              handleScoreChange(student.id, e.target.value)
                            }
                          />
                          <span className="ml-1 text-gray-500">
                            / {activity.maxScore}
                          </span>
                        </div>
                        <BrutalButton
                          variant="icon"
                          icon={
                            feedbacks[student.id] && feedbacks[student.id].trim() !== "" ? (
                              <MailCheck size={20} />
                            ) : (
                              <MailPlus size={20} />
                            )
                          }
                          disabled={!scores[student.id]}
                          className="h-9 w-16 text-gray-500"
                          shadow={false}
                          onClick={() => handleOpenFeedbackModal(student.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <NotFound message="No hay estudiantes para mostrar" />
            )}
            
          </div>

          {/* Paginación */}
          <div className="mt-4">
            <BrutalPagination
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={totalItems}
              totalPages={totalPages}
              hasPreviousPage={hasPreviousPage}
              hasNextPage={hasNextPage}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              pageSizeOptions={[...pageSizeOptions, totalItems]}
              itemLabel="estudiantes"
            />
          </div>

          {/* Botones de acción */}
          <div className="mt-4 flex w-full justify-end">
            <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:justify-end">
              <BrutalButton
                className="h-10 px-14 sm:w-auto"
                variant="secondary"
                onClick={handleReset}
              >
                Cancelar
              </BrutalButton>
              <BrutalButton
                className="h-10 w-full sm:w-full md:w-60"
                variant="icon"
                icon={<IoMdSave size={20} />}
                type="submit"
                onClick={handleSaveScores}
              >
                Guardar Calificaciones
              </BrutalButton>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de calificar seleccionados */}
      <GradeSelectedModal
        isOpen={isModalOpen1}
        onClose={() => setIsModalOpen1(false)}
        selectedStudents={selectedStudents}
        maxScore={activity.maxScore}
        formik={gradeSelectedFormik}
      />

      {/* Modal para el feedback */}
      <SendFeedbackModal
        isOpen={isModalOpen2}
        onClose={() => setIsModalOpen2(false)}
        formik={feedbackFormik}
        studentName={currentStudentName}
      />
    </div>
  );
};
