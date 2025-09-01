export const getStateClassColor = (state) => {
  switch (state) {
    case "Pendiente":
      return "bg-yellow-100 text-yellow-800";
    case true:
      return "bg-green-100 text-green-800";
    case false:
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
};

export const getStateClassColorBard = (state) => {
  switch (state) {
    case "Pendiente":
      return "bg-yellow-500";
    case true:
      return "bg-green-500";
    case false:
      return "bg-blue-500";
    default:
      return "bg-yellow-500";
  }
};
