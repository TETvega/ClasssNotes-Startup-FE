## 🔗 Navegación

⬅️ [Volver Atrás](./index.md)  
🏠 [Volver al Inicio](/documentation/index.MD)

# ⚒️ useBreadcrumbStore

Este hook administra el estado global de navegación, principalmente para construir un **breadcrumb dinámico** que refleja el contexto actual del usuario (centro educativo, curso y actividad).

Ideal para mantener el estado aunque el usuario recargue la página, ya que sincroniza con `localStorage`.

## 🏗️ Estructura del Store

```ts
currentCenter: {
  id: string;
  name: string;
  abb: string;
}

currentCourse: {
  id: string;
  name: string;
}

currentActivity: {
  id: string;
  name: string;
}
```

## 🔧 API del Hook

* `setCurrentCenter(center: { id: string; name: string; abb: string })`

Guarda un centro educativo en el estado global y en `localStorage`.

* `getCurrentCenter(): void`

Obtiene el centro educativo desde `localStorage` y lo asigna al estado global.

* `clearCurrentCenter(): void`

Elimina el centro actual del estado y de `localStorage`.

* `setCurrentCourse(course: { id: string; name: string })`

Guarda un curso en el estado global y en `localStorage`.

* `getCurrentCourse(): void`

Obtiene el curso desde `localStorage` y lo asigna al estado global.

* `clearCurrentCourse(): void`

Elimina el curso actual del estado y de `localStorage`.

* `setCurrentActivity(activity: { id: string; name: string })`

Guarda una actividad en el estado global y en `localStorage`.

* `getCurrentActivity(): void`

Obtiene la actividad desde `localStorage` y la asigna al estado global.

* `clearCurrentActivity(): void`

Elimina la actividad actual del estado y de `localStorage`.

* `resetBreadcrumb(): void`

Limpia **todos** los niveles del breadcrumb (centro, curso, actividad) tanto del estado como de `localStorage`.

## 🧠 Ejemplo de uso

```tsx
import { useBreadcrumbStore } from "ruta/al/store";

const {
  currentCenter,
  setCurrentCenter,
  currentCourse,
  setCurrentCourse,
  currentActivity,
  setCurrentActivity,
  resetBreadcrumb,
} = useBreadcrumbStore();

// Ejemplo práctico
setCurrentCenter({ id: "C001", name: "UNAH", abb: "UNAH" });
setCurrentCourse({ id: "101", name: "Programación I" });
setCurrentActivity({ id: "33", name: "Examen Parcial 1" });
```

## 🔍 Uso real en componente

```tsx
<button
  onClick={() => {
    navigate(`/activities/${activity.id}/grade`);
    setCurrentCourse({
      id: activity.id,
      name: activity.courseName,
    });
    setCurrentCenter({
      id: activity.centerId,
      abb: activity.centerName,
    });
  }}
>
  Ver actividad
</button>
```

## 💡 Recomendaciones

- Este store puede evolucionar para incluir más niveles si se necesita (por ejemplo: unidad temática, módulo, etc.).
- Al implementar el breadcrumb visual, puedes leer directamente de `useBreadcrumbStore()`.

## 📁 Archivo recomendado

`src\shared\store\useBreadcrumbStore.js`
