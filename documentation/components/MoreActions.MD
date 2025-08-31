## 🔗 Navegación

⬅️ [Volver Atrás](./index.md)  
🏠 [Volver al Inicio](/documentation/index.MD)

# 📌 MoreActions

**MoreActions** es un componente **reutilizable** de botón de puntos suspensivos, con la intención que el usuario sepa que hay más opciones disponibles. Este componente puede complementarse con la documentación del modal **`ActionModal`** y del hook **`useClickOutside`**.

➡️ [Documentación ActionModal](./modals/ActionModal.MD)  
➡️ [Documentación useClickOutside](../hooks/useClickOutside.MD)

## 🚀 Novedades en la versión actual

- Implementación de `useFloating` para un posicionamiento inteligente del modal
- Mejor manejo de casos de borde (pantallas pequeñas, elementos cerca del borde)
- Código más limpio y mantenible
- Posicionamiento automático (arriba/abajo) según espacio disponible

## 📌 Propiedades (Props)

| Propiedad | Tipo        | Default | Descripción                                                                                                           |
| --------- | ----------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `actions` | `Array`     | `[]`    | Arreglo de objetos que contienen la información para renderizar cada acción en el modal.                              |
| `trigger` | `ReactNode` | `null`  | Elemento personalizado para activar el modal (opcional). Si no se provee, se usa el ícono de tres puntos por defecto. |

## 📌 Ejemplos de Uso

### Uso básico

```jsx
<MoreActions
  actions={[
    {
      icon: <CiEdit />,
      label: "Editar elemento",
      className: "text-gray-700",
      link: "/",
    },
    {
      icon: <FaRegTrashAlt />,
      label: "Eliminar elemento",
      className: "text-red-600",
      onClick: confirmElimination,
    },
  ]}
/>
```

### Con trigger personalizado

```jsx
<MoreActions
  trigger={<button className="custom-button">Opciones</button>}
  actions={[
    { icon: <CiEdit />, label: "Editar", className: "text-gray-700" },
    { icon: <FaDownload />, label: "Descargar", onClick: handleDownload },
  ]}
/>
```

## 📌 Explicación de Props Importantes

- `actions`: Arreglo de objetos que definen las acciones del modal. Cada objeto debe contener:
  - `icon`: React.JSX.Element - Icono a mostrar
  - `label`: string - Texto descriptivo
  - `className` : string - Clases de Tailwind CSS adicionales
  - `link?`: string (opcional) - Ruta para navegación
  - ` onClick?`: Function (opcional) - Función a ejecutar al hacer clic
  - `trigger?` (opcional): Elemento React personalizado que reemplaza el ícono de tres puntos por defecto.

✏️ Nota: Las propiedades con signo de interrogación (?) son opcionales, pero cada acción debe incluir al menos link u onClick.

## 📌 Ejemplo Aplicado

```jsx
export const MiComponente = () => {
  const { funcionAbreModalEliminar } = miHook();

  return (
    <div className="clasesPersonalizadas">
      <div className="otrasClasesPersonalizadas relative">
        <div className="flex w-full items-center justify-between">
          <h2>Título del componente</h2>

          <MoreActions
            actions={[
              {
                icon: <CiEdit />,
                label: "Editar curso",
                className: "text-gray-700",
                link: "/ruta/editar/elemento",
              },
              {
                icon: <FaRegTrashAlt />,
                label: "Eliminar elemento",
                className: "text-red-600",
                onClick: funcionAbreModalEliminar,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
```

## ⚠️ Consideraciones importantes

1. Posicionamiento relativo: El contenedor padre inmediato debe tener la clase `relative` para que el mod
2. Comportamiento responsive: El modal se ajusta automáticamente para mostrarse arriba o abajo según el espacio disponible en pantalla.
3. Accesibilidad: El componente maneja correctamente el foco y cierre al hacer clic fuera.
4. Trigger personalizado: Al usar un trigger personalizado, asegúrese de que sea un elemento clickeable y accesible.

## 🌟 Mejoras implementadas

- Posicionamiento más robusto usando `useFloating`
- Mejor manejo de casos de bordes en pantallas pequeñas
- Transiciones más suaves con `@headlessui/react`
- Código más limpio y mantenible
