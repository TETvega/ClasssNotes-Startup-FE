import { useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaUserCheck,
  FaUserMinus,
  FaUsers,
  FaUserTimes,
} from "react-icons/fa";

export const useStudentsFilter = (students) => {
  const [filter, setFilter] = useState("");

  const filterOptions = [
    { text: "Todos", icon: <FaUsers />, value: "" },
    { text: "Presente", icon: <FaUserCheck />, value: "PRESENT" },
    { text: "Ausente", icon: <FaUserTimes />, value: "NOT_PRESENT" },
    { text: "En espera", icon: <FaClock />, value: "WAITING" },
  ];

  const getStatusColorClass = (status) => {
    switch (status) {
      case "PRESENT":
        return "bg-action-primary";
      case "NOT_PRESENT":
        return "bg-red-500";
      case "EXCUSED":
        return "bg-green-500";
      case "WAITING":
      default:
        return "bg-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "PRESENT":
        return <FaCheckCircle className="text-action-primary" />;
      case "NOT_PRESENT":
        return <FaTimesCircle className="text-red-400" />;
      case "EXCUSED":
        return <FaUserMinus className="text-green-500" />;
      case "WAITING":
      default:
        return <FaClock className="text-gray-300" />;
    }
  };

  const getNotFoundMessage = () => {
    const message = "No hay estudiantes";
    switch (filter) {
      case "PRESENT":
        return `${message} presentes`;
      case "NOT_PRESENT":
        return `${message} ausentes`;
      case "EXCUSED":
        return `${message} excusados`;
      case "WAITING":
        return `${message} en espera`;
      default:
        return `No se encontraron estudiantes.`;
    }
  };

  const filteredStudents = students.items.filter((student) => {
    const matchesStatus = filter === "" || student.status === filter;
    return matchesStatus;
  });

  return {
    filter,
    filterOptions,
    filteredStudents,
    setFilter,
    getStatusColorClass,
    getStatusIcon,
    getNotFoundMessage,
  };
};
