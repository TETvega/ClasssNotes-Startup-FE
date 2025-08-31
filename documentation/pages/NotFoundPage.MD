## 🔗 Navegación

⬅️ [Volver Atrás](./index.md)  
🏠 [Volver al Inicio](/documentation/index.MD)

# 🚫 NotFoundPage

**NotFoundPage** es una página reutilizable para manejar errores 404 dentro de la aplicación. Su propósito es informar al usuario que la ruta visitada no existe o no está disponible, mostrando un mensaje personalizado y opciones para regresar o volver al inicio.

Esta página puede recibir un mensaje personalizado mediante `location.state.message`, lo que permite adaptarla según el tipo de error (por ejemplo: curso, actividad o centro no encontrado).

## 📌 Características principales

- ✅ Totalmente **responsiva** para móviles y pantallas grandes.
- 🔁 Usa React Router (`useNavigate`, `useLocation`) para control de navegación.
- ✉️ Permite **mensajes personalizados** según el origen del error.
- 🧩 Compatible con el botón `BrutalButton` para mantener el estilo de la app.
- 🧭 Opciones para volver atrás o ir al dashboard.

## 📌 Props esperados

La página no recibe props directamente, pero sí utiliza la propiedad `state` del objeto `location` de React Router.

| Fuente           | Propiedad | Tipo     | Default                  | Descripción                                                     |
| ---------------- | --------- | -------- | ------------------------ | --------------------------------------------------------------- |
| `location.state` | `message` | `string` | `"Página no encontrada"` | Texto personalizado a mostrar en lugar del mensaje por defecto. |

## 📌 Ejemplo de navegación con mensaje personalizado

```jsx
navigate("/not-found", {
  state: { message: "Curso no encontrado" },
});
```

Esto mostrará `"Curso no encontrado"` en lugar del mensaje genérico.

## 📌 Diseño

La interfaz contiene:

- Un encabezado con el código de error `404`.
- Un mensaje destacado con el error personalizado.
- Una descripción secundaria explicativa.
- Dos botones:
  - 🔙 Regresar a la pantalla anterior (página anterior a la ruta invalida).
  - 🏠 Ir al dashboard (inicio).

## 📌 Fragmento de código relevante

```jsx
const customMessage = location.state?.message || "Página no encontrada";
```

## ⚠️ Importante

Esta página se debe utilizar para redirigir manualmente desde una validación de ID inválido, por ejemplo:

```jsx
if (response?.statusCode === 404) {
  navigate("/not-found", { state: { message: "Centro no encontrado" } });
}
```
