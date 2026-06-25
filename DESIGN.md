# DESIGN.md - Sistema Geométrico: Cut Corners (Esquinas Cortadas)

_Instrucciones para Agentes de IA: Este documento es la fuente de la verdad para la generación de UI. Sigue estrictamente los tokens, la estructura HTML/CSS proporcionada y las reglas de prohibición. No inventes nuevas geometrías._

## 0. Contexto para el Agente

- **Tema por defecto:** Dark Mode (Tema Oscuro).
- **Estética:** Retro-futurista, técnica, ingeniería aeroespacial, alto rendimiento.
- **Tecnología:** CSS puro con variables (Tokens). Uso intensivo de `clip-path` y `oklch` para colores.

## 1. Sistema de Diseño: Tokens (Color y Geometría)

El agente debe utilizar **exclusivamente** estas variables. No usar hexadecimales ni RGB.

### 1.1. Tokens de Color (Dark Mode)

```css
:root {
  /* Superficies base (Dark Mode por defecto) */
  --background: oklch(0.145 0 0); /* Fondo principal de la app */
  --card: oklch(0.205 0 0); /* Superficie de tarjetas y modales */
  --card-hover: oklch(0.235 0 0); /* Estado hover de tarjetas */

  /* Texto */
  --text-primary: oklch(0.95 0 0);
  --text-secondary: oklch(0.7 0 0);
  --text-disabled: oklch(0.5 0 0);

  /* Bordes y separadores */
  --border-default: oklch(0.3 0 0);
  --border-focus: oklch(0.65 0.15 220); /* Azul cian técnico para foco */

  /* Acentos (Acciones Técnicas) */
  --accent-primary: oklch(0.7 0.15 220); /* Azul eléctrico */
  --accent-success: oklch(0.7 0.18 145); /* Verde neón */
  --accent-warning: oklch(0.75 0.15 85); /* Ámbar */
  --accent-danger: oklch(0.65 0.2 25); /* Rojo coral */
}
```

### 1.2. Tokens Geométricos

```css
:root {
  --radius-soft: 12px; /* Para esquinas NO cortadas y Inputs */
  --cut-size-sm: 8px; /* Botones, Badges, Chips */
  --cut-size-md: 16px; /* Cards, Panels, Dropdowns */
  --cut-size-lg: 24px; /* Modales, Hero sections */
}
```

## 2. Reglas Estrictas para el Agente (Do's & Don'ts)

- **REGLA 1 (Direccionalidad):** El corte siempre será diagonal opuesto (Arriba-Derecha y Abajo-Izquierda). No cortes las 4 esquinas ni uses cortes en el mismo lado.
- **REGLA 2 (Inputs):** **PROHIBIDO** aplicar `clip-path` a inputs, textareas o selects. Usar `border-radius: var(--radius-soft)`.
- **REGLA 3 (Padding):** El padding interno de cualquier contenedor con corte debe ser **mayor o igual** al `--cut-size` correspondiente. Ej: `padding: var(--cut-size-md)`.
- **REGLA 4 (Sombras):** `clip-path` destruye `box-shadow`. Para proyectar sombras, el agente DEBE usar la estructura Wrapper -> Inner descrita en la Sección 3.
- **REGLA 5 (Foco):** No uses `outline` nativo en elementos cortados. Usa un `box-shadow: inset` en el elemento hijo, o un wrapper con borde brillante.

## 3. Patrones de Implementación (HTML + CSS)

El agente debe generar este patrón exacto cuando se le pida un Card, Modal o Botón.

### 3.1. Card con Cut Corners y Sombras (El Estándar)

```html
<!-- Wrapper: Maneja la sombra externa y el foco. NO tiene clip-path -->
<div class="card-wrapper">
  <!-- Inner: Maneja el fondo, el contenido y el clip-path -->
  <div class="card-inner geom-cut-md">
    <h3>Panel de Control</h3>
    <p>Datos de telemetría...</p>
  </div>
</div>
```

```css
.card-wrapper {
  display: inline-block;
  /* Solución para sombra con clip-path: filter drop-shadow en el wrapper */
  filter: drop-shadow(0 4px 12px oklch(0 0 0 / 0.4));
  transition: filter 0.2s ease;
}

.card-wrapper:hover {
  filter: drop-shadow(0 8px 24px oklch(0.7 0.15 220 / 0.2)); /* Glow azul */
}

.card-inner {
  background-color: var(--card);
  padding: var(--cut-size-md); /* Cumple la REGLA 3 */
  color: var(--text-primary);
  transition: background-color 0.2s ease;
}

.card-wrapper:hover .card-inner {
  background-color: var(--card-hover);
}

/* Clase de utilidad estándar para corte medio */
.geom-cut-md {
  border-radius: var(--radius-soft); /* Esquinas intactas suaves */
  clip-path: polygon(
    0% 0%,
    /* Top-Left intacta */ calc(100% - var(--cut-size-md)) 0%,
    /* Pre-cut Top-Right */ 100% var(--cut-size-md),
    /* Post-cut Top-Right */ 100% 100%,
    /* Bottom-Right intacta */ var(--cut-size-md) 100%,
    /* Pre-cut Bottom-Left */ 0% calc(100% - var(--cut-size-md))
      /* Post-cut Bottom-Left */
  );
}

/* Variantes de tamaño (El agente debe generarlas según necesidad) */
.geom-cut-sm {
  /* mismo polygon pero con var(--cut-size-sm) */
}
.geom-cut-lg {
  /* mismo polygon pero con var(--cut-size-lg) */
}
```

### 3.2. Inputs (La Excepción Geométrica)

```css
.input-base {
  background-color: var(--background);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-soft); /* Suave, NO cortado */
  padding: 12px 16px;
  color: var(--text-primary);
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.input-base:focus {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px oklch(0.65 0.15 220 / 0.3); /* Foco accesible */
}
```

### 3.3. Botones CTA (Movimiento Direccional)

Los botones de acción principal usan corte para sugerir avance.

```css
.btn-cta {
  background-color: var(--accent-primary);
  color: var(--background);
  font-weight: bold;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  /* Corte solo en la esquina inferior derecha para sugerir flecha/avance */
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% calc(100% - 8px),
    calc(100% - 8px) 100%,
    0% 100%
  );
  transition: background-color 0.2s ease;
}

.btn-cta:hover {
  background-color: oklch(0.75 0.15 220);
}
```

## 4. Sistema de Componentes (Especificaciones)

- **Modales/Dialogs:** Usar `.geom-cut-lg`. Fondo con `--card`. Overlay detrás con `oklch(0 0 0 / 0.7)` (negro con 70% opacidad).
- **Tooltips:** Usar `.geom-cut-sm`. Fondo con `--text-primary`, texto con `--background` (color invertido para alto contraste).
- **Badges/Tags:** Usar `.geom-cut-sm`. Fondo con colores de acento translúcidos (ej: `oklch(0.70 0.15 220 / 0.15)` y texto `--accent-primary`).
- **Iconos:** Mantenerse fuera de los límites del `clip-path`. Si un ícono debe estar en una esquina cortada, posicionarlo con `padding` seguro.

## 5. Prompting Guide para el Agente

Cuando un usuario pida un componente, el agente debe seguir esta checklist mental antes de generar código:

1. ¿Es un contenedor de información? -> Aplicar Wrapper + Inner + `geom-cut-md`.
2. ¿Es un campo de texto? -> Aplicar `border-radius` suave. NO aplicar `clip-path`.
3. ¿Es una acción principal? -> Aplicar corte direccional simple.
4. ¿Los colores usan variables `oklch`? -> Si no, corregir.
5. ¿El padding supera el tamaño del corte? -> Si no, aumentar padding.
