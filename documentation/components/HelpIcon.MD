## 🔗 Navegación

⬅️ [Volver Atrás](./index.md)  
🏠 [Volver al Inicio](/documentation/index.MD)

# 📌 HelpIcon

**HelpIcon** es un componente **reutilizable** que muestra un mensaje informativo cuando el usuario coloca el cursor sobre un ícono. Soporta diferentes posiciones y tamaños para el cuadro de texto emergente.

## 📌 Propiedades (Props)

| Propiedad  | Tipo                                     | Default                             | Descripción                                                           |
| ---------- | ---------------------------------------- | ----------------------------------- | --------------------------------------------------------------------- |
| `message`  | `string`                                 | `undefined`                         | Mensaje informativo que se muestra al usuario.                        |
| `position` | `"bottom" \| "top" \| "left" \| "right"` | `"bottom"`                          | Dirección en la que se mostrará el cuadro de texto respecto al ícono. |
| `width`    | `string`                                 | `"50"`                              | Anchura del cuadro de texto.                                          |
| `height`   | `string`                                 | `"50"`                              | Altura del cuadro de texto.                                           |
| `icon`     | `React.ReactNode`                        | `<FaRegQuestionCircle size={16} />` | Ícono que activa el mensaje al pasar el cursor sobre él.              |

## 📌 Ejemplos de Uso

### ❓ **HelpIcon con mensaje predeterminado**

🔹 Muestra un mensaje cuando el usuario coloca el cursor sobre el ícono.

```jsx
<HelpIcon message="Este es un tooltip informativo." />
```

### 🔝 **HelpIcon con posición personalizada**

🔹 Se puede cambiar la posición del mensaje emergente.

```jsx
<HelpIcon message="HelpIcon en la parte superior" position="top" />
```

### 📏 **HelpIcon con tamaño personalizado**

🔹 Se puede modificar el ancho y alto del cuadro de texto.

```jsx
<HelpIcon message="Este es un mensaje más grande" width="100" height="60" />
```

### 🔘 **HelpIcon con ícono personalizado**

🔹 Se puede cambiar el ícono que activa el tooltip.

```jsx
import { FaInfoCircle } from "react-icons/fa";

<HelpIcon message="Información adicional" icon={<FaInfoCircle size={20} />} />;
```

## 📌 Explicación de Props Importantes

- **`message`**: Define el texto que aparecerá dentro del tooltip.
- **`position`**: Determina la dirección en la que se mostrará el cuadro emergente (`bottom`, `top`, `left`, `right`).
- **`width` y `height`**: Permiten personalizar el tamaño del tooltip.
- **`icon`**: Permite utilizar cualquier ícono en lugar del predeterminado.

## 📌 Ejemplo Aplicado

```jsx
<HelpIcon
  message="Haz clic para más información"
  position="right"
  width="80"
  height="40"
/>
```
