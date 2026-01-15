import { cn } from "@/helpers/classname";
import type { HTMLAttributes, MouseEventHandler } from "preact";
import { useEffect, useRef, useState, type ReactNode } from "preact/compat";
import "./button.css";

export type ButtonCornerStyle =
  | "default" // Original del card
  | "hex" // Esquinas hexagonales
  | "chip" // Esquinas tipo chip/IC
  | "stepped" // Esquinas escalonadas
  | "circuit" // Esquinas de circuito
  | "angled"; // Esquinas anguladas

/**
 * Variantes de botón disponibles
 */
export type ButtonVariant =
  | "primary" // Estilo principal (ciano)
  | "secondary" // Estilo secundario (morado)
  | "accent" // Estilo de acento (amarillo)
  | "danger" // Estilo de peligro (rojo)
  | "ghost" // Estilo sin fondo
  | "outline"; // Estilo con borde

/**
 * Tamaños de botón disponibles
 */
export type ButtonSize = "sm" | "md" | "lg" | "xl";

/**
 * Estados de carga del botón
 */
export type ButtonLoadingState = "idle" | "loading" | "success" | "error";

/**
 * Props del componente Button - Versión Hextech
 */
export interface ButtonProps
  extends Omit<
    HTMLAttributes<HTMLElement>,
    "size" | "onMouseEnter" | "onMouseLeave"
  > {
  /**
   * Contenido del botón (texto o elemento)
   */
  children: ReactNode;

  /**
   * Estilo de esquinas
   * @default "hex"
   */
  cornerStyle?: ButtonCornerStyle;

  /**
   * Variante visual del botón
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * Tamaño del botón
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Si el botón está deshabilitado
   * @default false
   */
  disabled?: boolean;

  /**
   * Si el botón está en estado de carga
   * @default false
   */
  loading?: boolean;

  /**
   * Estado de carga avanzado (sobrescribe `loading`)
   */
  loadingState?: ButtonLoadingState;

  /**
   * Si el botón ocupa todo el ancho disponible
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Icono a mostrar a la izquierda del texto
   */
  leftIcon?: ReactNode;

  /**
   * Icono a mostrar a la derecha del texto
   */
  rightIcon?: ReactNode;

  /**
   * Si se debe mostrar un efecto de clic
   * @default true
   */
  clickEffect?: boolean;

  /**
   * Si se debe mostrar un efecto de sonido al hacer clic
   * @default false
   */
  soundEffect?: boolean;

  /**
   * Tipo de botón HTML
   * @default "button"
   */
  type?: "button" | "submit" | "reset";

  /**
   * URL para enlace (convierte el botón en <a>)
   */
  href?: string;

  /**
   * Objetivo del enlace
   */
  target?: "_blank" | "_self" | "_parent" | "_top";

  /**
   * Clases CSS adicionales
   */
  className?: string;

  /**
   * Función llamada al hacer clic
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  /**
   * Si el botón debe tener estilo activo (seleccionado)
   */
  active?: boolean;

  /**
   * Texto de accesibilidad para estado de carga
   */
  loadingText?: string;

  /**
   * Texto de éxito para estado de carga
   */
  successText?: string;

  /**
   * Texto de error para estado de carga
   */
  errorText?: string;

  /**
   * Si mostrar efecto de conexión de circuitos
   * @default false
   */
  circuitEffect?: boolean;

  /**
   * Duración del efecto de clic en ms
   * @default 300
   */
  clickEffectDuration?: number;
}

/**
 * Componente de botón Hextech cyberpunk
 *
 * Versión alternativa con esquinas hexagonales y efectos de circuito
 *
 * @example
 * ```tsx
 * <Button cornerStyle="hex" variant="primary">
 *   Inicializar Sistema
 * </Button>
 *
 * <Button cornerStyle="circuit" circuitEffect variant="accent">
 *   Conectar Red
 * </Button>
 * ```
 */
export const Button = ({
  children,
  cornerStyle = "hex",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  loadingState = "idle",
  fullWidth = false,
  leftIcon,
  rightIcon,
  clickEffect = true,
  soundEffect = false,
  type = "button",
  href,
  target,
  className,
  onClick,
  active = false,
  loadingText = "Procesando...",
  successText = "¡Completado!",
  errorText = "Error",
  circuitEffect = false,
  clickEffectDuration = 300,
  ...props
}: ButtonProps) => {
  // Estado interno para efectos visuales
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [connectionPoints, setConnectionPoints] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const connectionId = useRef(0);

  // Determinar el estado de carga final
  const finalLoadingState = loading ? "loading" : loadingState;

  // Mapeo de esquinas a clases CSS
  const cornerClasses = {
    default: "cyber-clip",
    hex: "cyber-button-hex-clip",
    chip: "cyber-button-chip-clip",
    stepped: "cyber-button-stepped-clip",
    circuit: "cyber-button-circuit-clip",
    angled: "cyber-button-angled-clip",
  };

  // Mapeo de variantes a clases CSS
  const variantClasses = {
    primary:
      "bg-primary/5 border-primary/40 text-primary hover:bg-primary/15 hover:border-primary/60 cyber-button-glow-primary",
    secondary:
      "bg-secondary/5 border-secondary/40 text-secondary hover:bg-secondary/15 hover:border-secondary/60 cyber-button-glow-secondary",
    accent:
      "bg-accent/5 border-accent/40 text-accent hover:bg-accent/15 hover:border-accent/60 cyber-button-glow-accent",
    danger:
      "bg-danger/5 border-danger/40 text-danger hover:bg-danger/15 hover:border-danger/60 cyber-button-glow-danger",
    ghost: "bg-transparent border-transparent text-primary hover:bg-primary/5",
    outline:
      "bg-transparent border-primary/60 text-primary hover:bg-primary/10",
  };

  // Mapeo de tamaños a clases CSS
  const sizeClasses = {
    sm: "px-4 py-2 text-xs min-h-8",
    md: "px-6 py-3 text-sm min-h-10",
    lg: "px-8 py-4 text-base min-h-12",
    xl: "px-10 py-5 text-lg min-h-14",
  };

  // Mapeo de estados de carga a contenido
  const loadingContent = {
    idle: children,
    loading: (
      <div className="relative flex items-center gap-2">
        <div className="relative h-4 w-4">
          <div className="absolute inset-0 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-1 border border-current/30 rounded-full" />
        </div>
        {loadingText}
      </div>
    ),
    success: (
      <div className="flex items-center gap-2">
        <div className="relative h-4 w-4">
          <div className="absolute inset-0 bg-current rounded-full animate-ping opacity-20" />
          <div className="absolute inset-0.5 bg-current rounded-full" />
        </div>
        {successText}
      </div>
    ),
    error: (
      <div className="flex items-center gap-2">
        <div className="relative h-4 w-4">
          <div className="absolute inset-0 bg-current rounded-full animate-pulse" />
          <span className="absolute inset-0 flex items-center justify-center text-xs text-bg font-bold">
            !
          </span>
        </div>
        {errorText}
      </div>
    ),
  };

  // Efecto de conexión de circuitos al hacer hover
  useEffect(() => {
    if (
      !circuitEffect ||
      !isHovered ||
      disabled ||
      finalLoadingState === "loading"
    )
      return;

    const interval = setInterval(() => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        const id = ++connectionId.current;

        setConnectionPoints((prev) => [...prev, { x, y, id }]);

        // Remover el punto después de la animación
        setTimeout(() => {
          setConnectionPoints((prev) =>
            prev.filter((point) => point.id !== id)
          );
        }, 1000);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [circuitEffect, isHovered, disabled, finalLoadingState]);

  // Manejador de clic personalizado
  const handleClick: MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = (event) => {
    if (disabled || finalLoadingState === "loading") return;

    // Efecto visual de clic
    if (clickEffect) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), clickEffectDuration);
    }

    // Llamar al onClick original si existe
    if (onClick && !href) onClick(event as any);
  };

  // Clases base del botón
  const baseClasses = cn(
    cornerClasses[cornerStyle],
    "relative",
    "group",
    "border",
    "font-mono",
    "font-bold",
    "uppercase",
    "tracking-widest",
    "transition-all",
    "duration-300",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-primary/50",
    "focus:ring-offset-2",
    "focus:ring-offset-bg",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
    "disabled:hover:transform-none",
    "overflow-hidden",
    active && "border-primary !bg-primary/20 scale-95",
    circuitEffect && "circuit-connection",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    finalLoadingState === "loading" && "cyber-button-hex-loading cursor-wait",
    isClicked && "scale-95",
    className
  );

  // Contenido del botón
  const buttonContent = (
    <>
      {/* Fondo con patrón hexagonal para esquinas hex */}
      {cornerStyle === "hex" && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--color-primary)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(60deg,transparent,transparent_2px,currentColor_2px,currentColor_4px)]" />
        </div>
      )}

      {/* Fondo con patrón de circuito para esquinas circuit */}
      {cornerStyle === "circuit" && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-5">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_8px,currentColor_8px,currentColor_10px)]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,currentColor_8px,currentColor_10px)]" />
        </div>
      )}

      {/* Efectos de conexión de circuitos */}
      {circuitEffect &&
        connectionPoints.map((point) => (
          <div
            key={point.id}
            className="absolute z-10 h-1 w-1 bg-current rounded-full animate-ping"
            style={{
              left: `${point.x}px`,
              top: `${point.y}px`,
            }}
          />
        ))}

      {/* Bordes decorativos según estilo de esquina */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {/* Para esquinas hex y circuit */}
        {(cornerStyle === "hex" || cornerStyle === "circuit") && (
          <>
            <span className="absolute left-2 top-0 h-1 w-2 bg-current/80" />
            <span className="absolute right-2 top-0 h-1 w-2 bg-current/80" />
            <span className="absolute bottom-0 left-2 h-1 w-2 bg-current/80" />
            <span className="absolute bottom-0 right-2 h-1 w-2 bg-current/80" />
          </>
        )}

        {/* Para esquinas stepped */}
        {cornerStyle === "stepped" && (
          <>
            <span className="absolute left-0 top-0 h-2 w-4 bg-current/80" />
            <span className="absolute left-0 top-0 h-4 w-2 bg-current/80" />
            <span className="absolute right-0 top-0 h-2 w-4 bg-current/80" />
            <span className="absolute right-0 bottom-0 h-4 w-2 bg-current/80" />
          </>
        )}

        {/* Para esquinas angled */}
        {cornerStyle === "angled" && (
          <>
            <div className="absolute left-0 top-0 w-4 h-4 overflow-hidden">
              <div className="absolute -left-2 -top-2 w-8 h-8 bg-current/80 rotate-45" />
            </div>
            <div className="absolute right-0 bottom-0 w-4 h-4 overflow-hidden">
              <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-current/80 rotate-45" />
            </div>
          </>
        )}

        {/* Indicador de estado activo */}
        {active && (
          <div className="absolute inset-0 border border-current/30 animate-pulse" />
        )}
      </div>

      {/* Efecto de escaneo al hacer hover */}
      {isHovered && !disabled && (
        <div className="pointer-events-none absolute inset-0 z-5">
          <div className="animate-scan absolute inset-0 h-[20%] bg-linear-to-b from-transparent via-current/10 to-transparent opacity-70" />
        </div>
      )}

      {/* Contenido principal */}
      <span className="relative z-30 flex items-center justify-center gap-3">
        {leftIcon && finalLoadingState === "idle" && (
          <span className="flex items-center animate-flicker">{leftIcon}</span>
        )}
        <span className="drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
          {loadingContent[finalLoadingState]}
        </span>
        {rightIcon && finalLoadingState === "idle" && (
          <span className="flex items-center animate-flicker">{rightIcon}</span>
        )}
      </span>

      {/* Partículas flotantes para esquinas hex */}
      {cornerStyle === "hex" && isHovered && !disabled && (
        <div className="pointer-events-none absolute inset-0 z-0">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 bg-current rounded-full animate-bounce"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}
    </>
  );

  // Si hay href, renderizar como enlace
  if (href) {
    return (
      <a
        ref={buttonRef as any}
        href={disabled ? undefined : href}
        target={target}
        className={cn(
          baseClasses,
          "inline-flex items-center justify-center cursor-pointer"
        )}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-disabled={disabled}
        {...props}
      >
        {buttonContent}
      </a>
    );
  }

  // Renderizar como botón normal
  return (
    <button
      ref={buttonRef as any}
      type={type}
      disabled={disabled || finalLoadingState === "loading"}
      className={baseClasses}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-busy={finalLoadingState === "loading"}
      {...props}
    >
      {buttonContent}
    </button>
  );
};
export default Button;
