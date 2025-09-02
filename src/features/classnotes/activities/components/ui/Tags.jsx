export const Tags = ({ tag, iconMap }) => {
  if (!tag) return null;

  const IconComponent = iconMap[tag.icon]; // Obtener el ícono correspondiente del diccionario

  return (
    <span
      className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
      style={{
        backgroundColor: `#${tag.colorHex}`,
        color: "#fff",
      }}
    >
      {IconComponent && <IconComponent className="h-4 w-4" />}{" "}
      {/* Renderizar el ícono */}
      {tag.name}
    </span>
  );
};
