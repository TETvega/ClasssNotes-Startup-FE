import { useEffect } from "react";
import { useAttendanceModal, useTakeAttendance } from "../hooks";
import { useAttendanceStatusStore } from "../store";
import { useBreadcrumbStore } from "../../../../shared/store/useBreadcrumbStore";
import { Breadcrumb } from "../../../../shared/components/ui";
import { ProgressAttendance } from "../components/ui";
import { RegisterAttendanceModal } from "../components/modals";
import {
  ControlAssistedAttendance,
  ControlAttendance,
  RegisterAttendanceComponents,
} from "../components";

export const TakeAttendencePage = () => {
  const {
    status,
    qrChecked,
    otpChecked,
    strictMode,
    selectedMethods,
    paginatedStudents,
    pageSizeOptions,
    allStudents,
    qr,
    isAttendaceRequestLoading,
    hasTakenAttendanceToday,
    expiresIn,
    setStatus,
    setQrChecked,
    setOtpChecked,
    setStrictMode,
    startAttendanceProcess,
    stopAttendanceProcess,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    clearAttendanceState,
  } = useTakeAttendance();

  const { isCourseAttendanceTaken } = useAttendanceStatusStore();
  const { currentCourse } = useBreadcrumbStore();

  // Determinar qué métodos fueron seleccionados
  if (qrChecked) selectedMethods.push("QR");
  if (otpChecked) selectedMethods.push("OTP");

  useEffect(() => {
    return () => {
      const isAttendanceTaken = isCourseAttendanceTaken(currentCourse.id);
      if (isAttendanceTaken) {
        clearAttendanceState();
      }
    };
  }, []);

  const { isModalOpen, setModalOpen, activeTab, setActiveTab } = useAttendanceModal(qrChecked, otpChecked, status, selectedMethods);
  
  return (
    <div className="w-full">
      {/* Main Content Section */}
      <main className="">
        <Breadcrumb onClickBack={stopAttendanceProcess} />

        {/* Control de Asistencia */}
        <ControlAssistedAttendance
          status={status}
          setStatus={setStatus}
          qrChecked={qrChecked}
          setQrChecked={setQrChecked}
          otpChecked={otpChecked}
          setOtpChecked={setOtpChecked}
          setStrictMode={setStrictMode}
          strictMode={strictMode}
          selectedMethods={selectedMethods}
          startAttendanceProcess={startAttendanceProcess}
          isLoading={isAttendaceRequestLoading}
          qr={qr}
          isModalOpen={isModalOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          hasTakenAttendanceToday={hasTakenAttendanceToday}
          expiresIn={expiresIn}
        />

        {/* Contenido Dinámico */}
        {status ? (
          <div className="gap-4">
            <ProgressAttendance allStudents={allStudents} />
            <RegisterAttendanceComponents
              students={paginatedStudents}
              pageSizeOptions={pageSizeOptions}
              handlePageChange={handlePageChange}
              handlePageSizeChange={handlePageSizeChange}
              handleSearch={handleSearch}
            />
          </div>
        ) : (
          <ControlAttendance />
        )}
      </main>

      {/* Modal Unificado */}
      {isModalOpen && (
        <RegisterAttendanceModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          selectedMethods={selectedMethods}
          qr={qr}
          tab={activeTab || selectedMethods[0]}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
};
