import { useState, useEffect } from "react";

export const useAttendanceModal = (
  qrChecked,
  otpChecked,
  status,
  selectedMethods,
) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [activeTab, setActiveTab] = useState(selectedMethods[0]); 
  useEffect(() => {
    if (status) {
      if (qrChecked && otpChecked) {
        setModalType("BOTH"); // Abrir modal con ambas opciones
      } else if (qrChecked) {
        setModalType("QR"); // Modal solo QR
      } else if (otpChecked) {
        setModalType("OTP"); // Modal solo OTP
      }
      setModalOpen(true); // Abrir el modal automáticamente
    }
  }, [status, qrChecked, otpChecked]);

  return { isModalOpen, modalType, setModalOpen, activeTab, setActiveTab };
};
