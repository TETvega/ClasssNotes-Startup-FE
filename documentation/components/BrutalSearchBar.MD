## 🔗 Navegación

⬅️ [Volver Atrás](./index.md)  
🏠 [Volver al Inicio](/documentation/index.MD)

# 🔍 BrutalSearchBar

**Componente de búsqueda brutalista** con funcionalidades completas: limpieza automática, búsqueda por Enter y alta personalización.

## 📌 Props

| Propiedad      | Tipo                      | Default       | Descripción                   |
| -------------- | ------------------------- | ------------- | ----------------------------- |
| `placeholder`  | `string`                  | `"Buscar..."` | Texto guía en el input        |
| `onSearch`     | `(query: string) => void` | `undefined`   | Callback al ejecutar búsqueda |
| `initialValue` | `string`                  | `""`          | Valor inicial                 |
| `buttonText`   | `string`                  | `"Buscar"`    | Texto del botón               |
| `className`    | `string`                  | `""`          | Clases CSS extra              |

## 🛠️ Uso Básico

```jsx
import BrutalSearchBar from "@/components/BrutalSearchBar";

function SearchExample() {
  const handleSearch = (query) => {
    console.log("Buscando:", query);
    // Lógica de búsqueda aquí
  };

  return (
    <BrutalSearchBar
      onSearch={handleSearch}
      placeholder="Buscar productos..."
    />
  );
}
```

### 🎨 Customización

🔄 Valor Inicial

```jsx
<BrutalSearchBar initialValue="React" onSearch={setSearchQuery} />
```

🖇️ Integración con Estado

```jsx
const [searchTerm, setSearchTerm] = useState("");
<BrutalSearchBar
  onSearch={setSearchTerm}
  initialValue={searchTerm}
  buttonText="Filtrar"
/>;
```

💡 Features Destacadas

- Búsqueda por Enter (keydown detection)

- Botón de limpieza automático (aparece solo con texto)

- Diseño responsive (450px base + max-w-full)

- Estilo brutalista con:

- Bordes cuadrados

- Alto contraste

- Feedback visual al enfocar

🧩 Composición Completa

```jsx
<div className="flex flex-col gap-4 p-4">
  <h2 className="font-brutal text-xl">Buscador</h2>
  <BrutalSearchBar
    placeholder="Buscar cursos..."
    buttonText="Filtrar"
    className="border-2 border-black"
  />
  <BrutalButton variant="secondary">Reiniciar Filtros</BrutalButton>
</div>
```

Estilos Base:

```css
.brutal-search {
  --border-color: #171717;
  --focus-ring: #22c55e;
}
```
