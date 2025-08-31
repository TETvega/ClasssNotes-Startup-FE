## 🔗 Navegación

⬅️ [Volver Atrás](./index.md)  
🏠 [Volver al Inicio](/documentation/index.MD)

# 📌 BrutalButton

**BrutalButton** es un componente **reutilizable** de botón con estilos inspirados en el diseño brutalista. Ofrece tres variantes (`primary`, `secondary`, `icon`) y permite personalizar su apariencia mediante clases adicionales.

## 📌 Propiedades (Props)

| Propiedad   | Tipo                                 | Default     | Descripción                                         |
| ----------- | ------------------------------------ | ----------- | --------------------------------------------------- |
| `variant`   | `"primary" \| "secondary" \| "icon"` | `"primary"` | Define el estilo del botón.                         |
| `icon`      | `React.ReactNode`                    | `undefined` | Ícono opcional dentro del botón (solo para `icon`). |
| `children`  | `React.ReactNode`                    | `-`         | Contenido dentro del botón.                         |
| `onClick`   | `function`                           | `undefined` | Función ejecutada al hacer clic.                    |
| `disabled`  | `boolean`                            | `false`     | Deshabilita el botón si es `true`.                  |
| `className` | `string`                             | `""`        | Clases CSS adicionales para personalización.        |
| `type`      | `"button" \| "submit" \| "reset"`    | `"button"`  | Tipo de botón.                                      |
| `shadow`    | `boolean`                            | `"true"`    | Define si se muestra la sombra o no                 |

## 📌 Ejemplos de Uso

### ✅ **Botón Primario**

🔹 Usado para acciones principales (color verde).

```jsx
<BrutalButton variant="primary">Aceptar</BrutalButton>
```

### ⚪ **Botón Secundario**

🔹 Usado para acciones secundarias o cancelaciones (color blanco).

```jsx
<BrutalButton variant="secondary">Cancelar</BrutalButton>
```

### ➕ **Botón con Ícono**

🔹 Un botón de acción que puede contener un ícono, con o sin texto.

```jsx
<BrutalButton variant="icon" icon={<Plus size={16} />}>
  Crear Centro Educativo
</BrutalButton>
```

## 📌 Explicación de Props Importantes

- **`variant`**: Define el estilo del botón (`primary`, `secondary` o `icon`).
- **`onClick`**: Especifica la función que se ejecutará al hacer clic.
- **`icon`** (solo en `icon`): Permite agregar un ícono al botón.
- **`className`**: Se usa para personalizar estilos. En algunos casos, para `icon`, es necesario definir el tamaño del botón con esta propiedad.

## 📌 Ejemplo Aplicado

```jsx
<BrutalButton onClick={() => navigate('/account/')} variant="secondary">
   Cancelar
</BrutalButton>

<BrutalButton variant="icon" icon={<CiCirclePlus size={20} />}>
   Clase
</BrutalButton>
```
