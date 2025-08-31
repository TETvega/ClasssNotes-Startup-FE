## 🔗 Navegación

⬅️ [Volver Atrás](./index.MD)  
🏠 [Volver al Inicio](/documentation/index.MD)

# 📌 ActionModal

**ActionModal** es un componente **reutilizable** de modal. Es utilizado principalmente por **`MoreActions`** para renderizar las distintas acciones que contiene un modal.

## 📌 Propiedades (Props)

| Propiedad   | Tipo       | Default     | Descripción                                                |
| ----------- | ---------- | ----------- | ---------------------------------------------------------- |
| `icon`      | `IconType` | `undefined` | Icono que representa la acción de la libreria React Icons. |
| `label`     | `string`   | `""`        | Texto que indica la acción.                                |
| `className` | `string`   | `""`        | Clases de Tailwind personalizadas si se llega a requerir.  |
| `link`      | `string`   | `undefined` | Ruta donde se redireccionará la aplicación.                |
| `onClick`   | `Function` | `undefined` | Función que ejecutará la aplicación.                       |

## 📌 Ejemplos de Uso

```jsx
<div className="clasesPersonalizadas">
  {actions.map((action, index) => (
    <ActionModal
      key={index}
      icon={action.icon}
      label={action.label}
      className={action.className}
      link={action.link ?? null}
      onClick={action.onClick ?? null}
    />
  ))}
</div>
```

## 📌 Explicación de Props Importantes

- **`icon`**: Define el icono que va a tener la acción y se usa de la libreria React Icons.
- **`label`**: Define el texto que va a tener la acción.
- **`className`**: Define clases de Tailwind personalizadas para personalizar cada acción.
- **`link`**: Define la ruta a donde se redirigirá al usuario si presiona la acción
- **`onClick`**: Define la función que se ejecutará si el usuario presiona la acción

### ⚠️ Consideraciones importantes de las propiedades

Todas las propiedades son funcionales y de importancia, las 3 primeras (**icon**, **label** y **className**) permiten la visualización unica de la acción. Las 2 ultimas (**link** y **onClick**) son opcionales de mandarse, sin embargo es necesario que al menos se envie una, enviar la propiedad **link** y no enviar **onClick** o viceversa, pero lo que no se recomienda es enviar las 2 en la misma acción, o en su contrario, no enviar ninguna de las 2, de ser el primer caso, se mostrará un warning en la consola del navegador explicando que solo se ejecutará el **onClick** y se ignorará el **link**, y de ser el segundo caso, se mostrará un error en la consola del navegador explicando que no se renderizará la acción por falta de la propiedad **link** u **onClick**

Este modal es aplicado directamente en el componente **`MoreActions`**

## 📌 Ejemplo Aplicado

```jsx
export const MoreActions = ({ actions = [] }) => {
  const { isOpen, ref, setIsOpen } = useClickOutside(false, "btn");

  return (
    <>
      <button
        className="rounded-full p-2 hover:cursor-pointer hover:bg-gray-100"
        onClick={() => setIsOpen((prev) => !prev)}
        id="btn"
      >
        <IoEllipsisVerticalSharp className="size-6 text-gray-700" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="absolute top-12 right-0 z-10 w-64 cursor-pointer rounded-md border bg-white shadow-lg"
          ref={ref}
        >
          {actions.map((action, index) => (
            <ActionModal
              key={index}
              icon={action.icon}
              label={action.label}
              className={action.className}
              link={action.link ?? null}
              onClick={action.onClick ?? null}
            />
          ))}
        </div>
      )}
    </>
  );
};
```

## ⚠️ Consideraciones importantes durante el uso

Este modal es aplicado directamente en el componente **`MoreActions`**, por lo que es mas seguro que se llegue a implementar ese componente que el actual de **`ActionModal`**. El **Ejemplo Aplicado** y **Ejemplo de uso** son sacados del componente de **`MoreActions`**
