## 🔗 Navegación

⬅️ [Volver Atrás](./index.md)  
🏠 [Volver al Inicio](/documentation/index.MD)  

# ⚒️ useClickOutside

El hook `useClickOutside` se utiliza para detectar clics fuera de un elemento específico y ejecutar una acción cuando esto ocurre. Es útil para manejar el cierre de modales, menús desplegables y otros elementos interactivos que deben ocultarse cuando el usuario hace clic fuera de ellos.

## Uso

```jsx
import { useState, useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";

const ExampleComponent = () => {
  const { ref, isOpen, setIsOpen } = useClickOutside(false, "element-id");

  return (
    <div>
      <button id="element-id" onClick={() => setIsOpen(!isOpen)}>Abrir Menú</button>
      {isOpen && (
        <div ref={ref} className="menu">
          <p>Contenido del menú</p>
        </div>
      )}
    </div>
  );
};
```

## Parámetros

| Parámetro      | Tipo                | Descripción                                                         |
| -------------- | ------------------- | ------------------------------------------------------------------- |
| `initialState` | `boolean`           | Estado inicial del elemento (abierto o cerrado). Por defecto se coloca en `false`                    |
| `ignoredId`    | `string` (opcional) | ID del elemento que no activará el cierre si se hace clic sobre él. Puede hacer referencia a un elemento `<button></button>`|

## Retorno

El hook devuelve un objeto con las siguientes propiedades:

| Propiedad   | Tipo       | Descripción                                    |
| ----------- | ---------- | ---------------------------------------------- |
| `ref`       | `object`   | Referencia del elemento a monitorear.          |
| `isOpen`    | `boolean`  | Estado de visibilidad del elemento.            |
| `setIsOpen` | `function` | Función para cambiar el estado de visibilidad. |

## Implementación Interna

El hook utiliza `useRef` para crear una referencia del elemento y `useEffect` para detectar clics fuera de este. Se agrega un `eventListener` al montar el componente y se elimina al desmontarlo para evitar fugas de memoria.

```js
import { useEffect, useRef, useState } from "react";

const useClickOutside = (initialState = false, ignoredId = null) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (isOpen && (event.target.closest(`#${ignoredId}`))) {
        return;
      }
    

      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ignoredId, isOpen]);

  return { ref, isOpen, setIsOpen };
};

export default useClickOutside;

```

## Consideraciones

- Este hook es útil para modales, menús y otros elementos flotantes.
- Se debe asignar `ref` al contenedor principal del elemento a ocultar.
- Se puede excluir un elemento específico mediante el parámetro `excludeId`.
- Colocar el id como en esta implementacion:

```js
        <button
          className="rounded-full p-2 hover:cursor-pointer hover:bg-gray-100"
          onClick={() => setIsOpen(prev => !prev)}
          id="btn"
        >
          <IoEllipsisVerticalSharp className="size-6 text-gray-700" />
        </button>
```

