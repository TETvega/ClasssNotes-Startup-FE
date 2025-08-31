## 🔗 Navegación

⬅️ [Volver Atrás](./index.md)  
🏠 [Volver al Inicio](/documentation/index.MD)

# 📌 BrutalPagination

✅ Paginación dinámica adaptativa  
✅ Contador de elementos visibles  
✅ Selector de items por página (4, 10, 20, 50)  
✅ Diseño responsive (mobile/desktop)  
✅ Estilos personalizables  
✅ Integración con React Query

## 🔧 Propiedades

| Propiedad          | Tipo       | Por defecto      | Descripción                                     |
| ------------------ | ---------- | ---------------- | ----------------------------------------------- |
| `currentPage`      | `number`   | `1`              | Página actual                                   |
| `pageSize`         | `number`   | `4`              | Items por página                                |
| `pageSizeOptions`  | `array`    | `[6, 9, 12, 24]` | Tamaños de pagina                               |
| `totalItems`       | `number`   | `0`              | Total de elementos                              |
| `totalPages`       | `number`   | `1`              | Total de páginas                                |
| `hasPreviousPage`  | `boolean`  | `false`          | ¿Existe página anterior?                        |
| `hasNextPage`      | `boolean`  | `false`          | ¿Existe página siguiente?                       |
| `onPageChange`     | `function` | -                | Handler cambio de página                        |
| `onPageSizeChange` | `function` | -                | Handler cambio tamaño página                    |
| `className`        | `string`   | `""`             | Clases CSS adicionales                          |
| `itemLabel`        | `string`   | `""`             | Etiqueta para los elementos (ej: "estudiantes") |


### Recomendación de Configuración de `pageSizeOptions`

Es recomendable utilizar la propiedad `pageSizeOptions` para definir automáticamente los tamaños de página disponibles y establecer el tamaño de página inicial.
Si solo se utiliza la propiedad `pageSize` sin especificar `pageSizeOptions`, asegúrate de que el valor de `pageSize` coincida con uno de los valores en `pageSizeOptions` para evitar inconsistencias en el comportamiento del componente.

## 💻 Ejemplos de implementación

### Uso Básico

```jsx
import { useState } from "react";
import BrutalPagination from "./BrutalPagination";

function App() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  return (
    <BrutalPagination
      currentPage={page}
      pageSize={pageSize}
      totalItems={87}
      totalPages={Math.ceil(87 / pageSize)}
      hasPreviousPage={page > 1}
      hasNextPage={page < Math.ceil(87 / pageSize)}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
    />
  );
}
```

### Implementación con TanStack Query y Custom Hook

```jsx
// 1. Custom Hook (useStudents.js)
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStudentsCourseAsync } from "../api/students";

export const useStudents = (id) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const pageSizeOptions = [5, 10, 15, 25];
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const { error, data, isLoading } = useQuery({
    queryKey: ["students", searchTerm, page, pageSize],
    queryFn: () => getStudentsCourseAsync(id, searchTerm, page, pageSize),
  });

  let students = data?.data;

  return {
    isLoading,
    students,
    searchTerm,
    setSearchTerm,
    pageSizeOptions,
    setPage,
    page,
    pageSize,
    setPageSize,
    error,
  };
};

// 2. Componente que utiliza el hook
import BrutalPagination from "../../../../shared/components/ui/BrutalPagination";
import { useStudents } from "../hook/useStudents";

export const StudentsPage = () => {
  const {
    students,
    isLoading,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageSizeOptions,
  } = useStudents(courseId);

  if (isLoading) return <LoadingSkeleton />;

  return (
    <main className="w-full">
      {/* Resto del componente */}
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
          itemLabel={"estudiantes"}
        />
      </div>
    </main>
  );
};
```

### 🎨 Con Personalización

```jsx
<BrutalPagination
  className="border-2 border-black"
  itemLabel="productos"
  // otras props...
/>
```

### 🎨 Estilos y Comportamiento

```jsx
🔘 Botones de Página
/* Base */
w-8 h-8 flex items-center justify-center rounded border
/* Activo (página actual) */
bg-green-50 border-green-600 text-green-600
/* Inactivo */
border-gray-200 hover:bg-gray-50
↔️ Botones de Navegación
w-8 h-8 flex items-center justify-center rounded bg-green-600 text-white
📊 Selector de Items
w-16 h-9 border rounded px-2 py-1 border-green-600
```

### 🛠️ Funcionamiento Interno

🔄 Lógica de Renderizado
Para ≤6 páginas: Muestra todos los números
[< 1 2 3 4 5 6 >]
Para >6 páginas: Muestra resumen con puntos suspensivos
[< 1 2 ... 5 6 7 ... 9 10 >]

### 🧮 Cálculo de Elementos Visibles

```jsx
const startItem = (currentPage - 1) * pageSize + 1;
const endItem = Math.min(currentPage * pageSize, totalItems);
```

### 📱 Responsive Design

- El componente se adapta automáticamente:
  - Desktop: Diseño horizontal (contador, paginación y selector en línea)
  - Mobile: Diseño vertical (elementos apilados)

📝 Notas Adicionales

- Requiere @mui/material para el hook usePagination
- Utiliza el componente BrutalButton para las flechas
- Los botones se deshabilitan automáticamente cuando no hay más páginas
- La propiedad `itemLabel` permite personalizar el texto para el contador (ej: "Mostrando 1-10 de 50 estudiantes")
