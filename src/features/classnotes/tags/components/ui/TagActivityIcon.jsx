import {
  FileText,
  BookOpen,
  Briefcase,
  FileCheck,
  MessageSquare,
  Beaker,
  LetterText,
  DiamondPlus,
  Presentation,
  Plane,
  NotebookText,
  Film,
  Speech,
  FileBadge,
  MessageCircleQuestion,
  FileQuestion,
} from "lucide-react"

/**
 * Mapea un código de icono a su componente de React Icons correspondiente
 * @param {string} iconCode - Código del icono (ej: "doc", "book")
 * @param {string} colorHex - Código de color hexadecimal sin el # (ej: "4eb234")
 * @param {number} size - Tamaño del icono (por defecto: 6, equivalente a w-6 h-6)
 * @param {string} label - Texto opcional para mostrar junto al icono
 * @returns {JSX.Element} - Componente JSX con el icono y estilos aplicados
 */

export const TagActivityIcon = (iconCode, colorHex, size = 6, label = null) => {
  // Asegurarse de que colorHex tenga el formato correcto
  const formattedColor = colorHex.startsWith("#") ? colorHex : `#${colorHex}`

  // Mapeo de códigos de iconos a componentes
  const iconMap = {
    doc: FileText,
    book: BookOpen,
    message: MessageSquare,
    project: Briefcase,
    flask: Beaker,
    completed: FileCheck,
    forum: Speech,
    presentation: Presentation,
    star: DiamondPlus,
    award: FileBadge,
    travel: Plane,
    tasks: NotebookText,
    question: MessageCircleQuestion,
    movies: Film,
    content: LetterText,
    undefined: FileQuestion,
  }

  // Obtener el componente de icono correspondiente o un icono por defecto
  const IconComponent = iconMap[iconCode] || FileText

  // Estilos base para el contenedor
  const containerStyle = {
    backgroundColor: `${formattedColor}33`, // 20% de opacidad en hex
    borderColor: formattedColor,
    borderWidth: "2px",
    borderRadius: "0.55rem",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: label ? "flex-start" : "center",
    width: label ? "auto" : `${size * 0.25 + 1}rem`,
    height: `${size * 0.25 + 1}rem`,
  }

  // Estilos para el icono
  const iconStyle = {
    color: formattedColor,
    width: `${size * 0.25}rem`,
    height: `${size * 0.25}rem`,
  }

  // Estilos para el texto de la etiqueta
  const labelStyle = {
    color: formattedColor,
    marginLeft: "0.5rem",
    fontWeight: "500",
    fontSize: `${size * 0.2}rem`,
  }

  return (
    <div style={containerStyle}>
      <IconComponent style={iconStyle} />
      {label && <span style={labelStyle}>
        {label === "Undefined" ? "Sin Etiqueta" : label}
      </span>}
    </div>
  )
}
