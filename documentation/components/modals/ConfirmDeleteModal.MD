## 🔗 Navegación

⬅️ [Volver Atrás](./index.MD)  
🏠 [Volver al Inicio](/documentation/index.MD)

# 📌 ConfirmDeleteModal

**ConfirmDeleteModal** es un componente **reutilizable** de modal de confirmación para eliminaciones. Utiliza Headless UI para la accesibilidad y funcionalidad del diálogo modal, y muestra mensajes personalizados según el tipo de elemento a eliminar.

## 📌 Propiedades (Props)

| Propiedad     | Tipo                                                                  | Default     | Descripción                                                             |
| ------------- | --------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------- |
| `isOpen`      | `boolean`                                                             | `undefined` | Indica si el modal está abierto o cerrado.                              |
| `onClose`     | `function`                                                            | `undefined` | Función que se ejecuta para cerrar el modal.                            |
| `itemType`    | `"center" \| "course" \| "user" \| "student" \| "activity" \| string` | `undefined` | Tipo de elemento a eliminar. Afecta al mensaje mostrado.                |
| `itemName`    | `string`                                                              | `undefined` | Nombre del elemento a eliminar. Aparece en el mensaje del modal.        |
| `description` | `string`                                                              | `undefined` | Descripción breve adicional sobre la eliminación.                       |
| `onConfirm`   | `function`                                                            | `undefined` | Función que se ejecuta cuando el usuario confirma la eliminación.       |
| `isPending`   | `boolean`                                                             | `undefined` | Indica si hay una operación en curso, como la eliminación del elemento. |

## 📌 Ejemplos de Uso

```jsx
<ConfirmDeleteModal
  isOpen={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  itemType="course"
  itemName="Matemáticas Avanzadas"
  description="Al eliminar este curso, también se eliminarán todas las actividades asociadas."
  onConfirm={handleDeleteCourse}
  isPending={isDeleting}
/>
```

## 📌 Explicación de Props Importantes

- **`itemType`**: Define el tipo de elemento a eliminar, lo que genera un mensaje específico. Los valores predefinidos incluyen: "center", "course", "user", "student", y "activity". Si se usa otro valor, se genera un mensaje genérico.
- **`itemName`**: Nombre específico del elemento que se mostrará en el mensaje de confirmación.
- **`description`**: Proporciona información adicional contextual sobre las consecuencias de la eliminación.
- **`onConfirm`**: Función crítica que maneja la lógica de eliminación cuando el usuario confirma.
- **`isPending`**: Controla el estado del botón de confirmación, mostrando un texto de "Eliminando..." y deshabilitando los botones durante la operación.

### ⚠️ Consideraciones importantes de las propiedades

- **`isOpen`** y **`onClose`** son obligatorios para controlar la visibilidad del modal.
- **`itemType`** y **`itemName`** son necesarios para generar el mensaje apropiado.
- **`onConfirm`** es esencial para manejar la acción de eliminación.
- El modal está diseñado para ser genérico pero con mensajes específicos según el tipo de elemento.

## 📌 Ejemplo Aplicado

```jsx
import { useState } from "react";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";

const CourseItem = ({ course }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    // Lógica para eliminar el curso
    await deleteCourse(course.id);
    setIsDeleting(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <h3>{course.name}</h3>
      <button onClick={() => setIsDeleteModalOpen(true)}>Eliminar Curso</button>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        itemType="course"
        itemName={course.name}
        description="Al eliminar este curso, se perderán todos los datos asociados."
        onConfirm={handleDelete}
        isPending={isDeleting}
      />
    </div>
  );
};
```

## ⚠️ Consideraciones importantes durante el uso

1. **Accesibilidad**: El modal utiliza Headless UI Dialog, que garantiza accesibilidad por defecto (focus trapping, gestión de teclado, etc.).
2. **Personalización de mensajes**: El componente genera mensajes automáticamente basados en `itemType`, pero se puede extender fácilmente modificando la función `generateMessage`.
3. **Estados de carga**: Cuando `isPending` es true, ambos botones se deshabilitan para prevenir acciones duplicadas durante el proceso de eliminación.
4. **Estilos**: Utiliza componentes BrutalButton con variantes predefinidas, pero los estilos del contenedor pueden personalizarse modificando las clases en el componente.
