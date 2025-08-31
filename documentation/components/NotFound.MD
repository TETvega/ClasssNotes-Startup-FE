## 🔗 Navegación

⬅️ [Volver Atrás](./index.md)  
🏠 [Volver al Inicio](/documentation/index.MD)

# 🚫 NotFound

**NotFound** es un componente **reutilizable** diseñado para mostrar una vista vacía o un estado de error cuando no hay datos disponibles o ocurre un problema.

Este componente permite personalizar el mensaje y el ícono mostrado.

## 📌 Propiedades (Props)

| Propiedad | Tipo                 | Default                              | Descripción                                                               |
| --------- | -------------------- | ------------------------------------ | ------------------------------------------------------------------------- |
| `message` | `string`             | `"No hay data"`                      | Texto que se mostrará al usuario.                                         |
| `icon`    | `React.ReactElement` | `<MdContentPasteSearch size={40} />` | Ícono que acompaña el mensaje. Se puede personalizar con cualquier ícono. |

## 📌 Ejemplos de Uso

### ✅ **Vista sin datos (por defecto)**

🔹 Se muestra el ícono y el mensaje predeterminados.

```jsx
<NotFound />
```

### ✅ **Vista con datos personalizados**

🔹 Se muestra el ícono y el mensaje proporcionados.

```jsx
<NotFound
  message="No se encontraron centros educativos"
  icon={<FileWarning size={30}>}
/>
```
