## 🔗 Navegación

⬅️ [Volver Atrás](./index.md)  
🏠 [Volver al Inicio](/documentation/index.MD)

# 📌 TagActivityIcon

**TagActivityIcon** es un componente **reutilizable** que muestra un icono con un color y un tamaño personalizados. Puede incluir una etiqueta opcional y se utiliza para representar diferentes tipos de actividades.

Por lo general este componente se utilizará de forma anidada a la data que tiene una Tag o Etiqueta.

## 📌 Propiedades (Props)

| Propiedad  | Tipo             | Default    | Descripción                                    |
| ---------- | ---------------- | ---------- | ---------------------------------------------- |
| `iconCode` | `string`         | `"doc"`    | Código del icono que se mostrará.              |
| `colorHex` | `string`         | `"000000"` | Color del icono en formato hexadecimal.        |
| `size`     | `number`         | `6`        | Tamaño del icono (equivalente a `w-6 h-6`).    |
| `label`    | `string \| null` | `null`     | Texto opcional que se mostrará junto al icono. |

## 📌 Códigos de Iconos Disponibles

| Código         | Icono                 |
| -------------- | --------------------- |
| `doc`          | FileText              |
| `book`         | BookOpen              |
| `message`      | MessageSquare         |
| `project`      | Briefcase             |
| `flask`        | Beaker                |
| `completed`    | FileCheck             |
| `star`         | DiamondPlus           |
| `content`      | LetterText            |
| `tasks`        | NotebookText          |
| `movies`       | Film                  |
| `question`     | MessageCircleQuestion |
| `forum`        | Speech                |
| `award`        | FileBadge             |
| `presentation` | Presentation          |
| `travel`       | Plane                 |

## 📌 Ejemplos de Uso

### ✉️ **TagActivityIcon con icono predeterminado**

🔹 Muestra un icono de documento con el color y tamaño predeterminado.

```jsx
{
  TagActivityIcon("doc", "4eb234");
}
```

### 📚 **TagActivityIcon con tamaño y etiqueta personalizada**

🔹 Agrega una etiqueta junto al icono.

```jsx
{
  TagActivityIcon("book", "ff5733", 5, "Lectura");
}
```

## 📌 Explicación de Props Importantes

- **`iconCode`**: Define el icono que se mostrará según la tabla de códigos disponibles.
- **`colorHex`**: Permite establecer el color del icono en formato hexadecimal.
- **`size`**: Ajusta el tamaño del icono en proporción a `w-6 h-6`.
- **`label`**: Agrega un texto junto al icono para dar más contexto.

## 📌 Ejemplo aplicado a los campos que trae una tag desde la API

```jsx
{
  TagActivityIcon(tag.icon, tag.colorHex, 5, tag.name);
}
```
