<!-- CyberpunkButton.svelte -->
<script lang="ts">
  import { cubicOut } from 'svelte/easing';
  import { fade, fly, scale } from 'svelte/transition';
  
  // Props del botón
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled = false;
  export let variant: 'primary' | 'destructive' | 'accent' | 'secondary' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let withSound = true;
  export let loading = false;
  
  // Sonidos para efectos (simulados)
  let audioContext: AudioContext | null = null;
  
  // Función para efecto de sonido
  const playClickSound = () => {
    if (!withSound || disabled || loading) return;
    
    try {
      // Crear un sonido tipo "bleep" cyberpunk
      if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Frecuencia basada en la variante
      const frequencies: Record<string, number> = {
        primary: 800,
        destructive: 400,
        accent: 1200,
        secondary: 600
      };
      
      oscillator.frequency.setValueAtTime(frequencies[variant], audioContext.currentTime);
      oscillator.type = 'sawtooth';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      // Fallback silencioso si hay error con audio
      console.log('Audio no disponible');
    }
  };
  
  // Clases para variantes
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground border-primary-foreground cyber-glow-primary',
    destructive: 'bg-destructive text-destructive-foreground border-destructive-foreground cyber-glow-destructive',
    accent: 'bg-accent text-accent-foreground border-accent-foreground cyber-glow-accent',
    secondary: 'bg-secondary text-secondary-foreground border-secondary-foreground cyber-glow-secondary'
  };
  
  // Clases para tamaños
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  // Estado para efectos de hover
  let isHovered = false;
  let isPressed = false;
  let mouseX = 0;
  let mouseY = 0;
  
  // Manejar movimiento del ratón sobre el botón
  function handleMouseMove(e: MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  }
</script>

<svelte:head> 
  
  <!-- Estilos adicionales para efectos Cyberpunk -->
  <style>
    /* Animaciones personalizadas para efectos Cyberpunk */
    @keyframes scanline {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }
    
    @keyframes flicker {
      0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 72%, 100% {
        opacity: 1;
      }
      20%, 21.999%, 63%, 63.999%, 65%, 71.999% {
        opacity: 0.8;
      }
    }
    
    @keyframes pulse-glow {
      0%, 100% {
        filter: drop-shadow(0 0 2px currentColor) drop-shadow(0 0 5px currentColor);
      }
      50% {
        filter: drop-shadow(0 0 5px currentColor) drop-shadow(0 0 10px currentColor) drop-shadow(0 0 15px currentColor);
      }
    }
    
    @keyframes glitch {
      0% {
        transform: translate(0);
      }
      20% {
        transform: translate(-1px, 1px);
      }
      40% {
        transform: translate(-1px, -1px);
      }
      60% {
        transform: translate(1px, 1px);
      }
      80% {
        transform: translate(1px, -1px);
      }
      100% {
        transform: translate(0);
      }
    }
    
    /* Clases para efectos de brillo */
    .cyber-glow-primary {
      box-shadow: 
        inset 0 0 10px theme('colors.primary.DEFAULT'),
        0 0 10px theme('colors.primary.DEFAULT'),
        0 0 20px theme('colors.primary.DEFAULT');
    }
    
    .cyber-glow-destructive {
      box-shadow: 
        inset 0 0 10px theme('colors.destructive.DEFAULT'),
        0 0 10px theme('colors.destructive.DEFAULT'),
        0 0 20px theme('colors.destructive.DEFAULT');
    }
    
    .cyber-glow-accent {
      box-shadow: 
        inset 0 0 10px theme('colors.accent.DEFAULT'),
        0 0 10px theme('colors.accent.DEFAULT'),
        0 0 20px theme('colors.accent.DEFAULT');
    }
    
    .cyber-glow-secondary {
      box-shadow: 
        inset 0 0 10px theme('colors.secondary.DEFAULT'),
        0 0 10px theme('colors.secondary.DEFAULT'),
        0 0 20px theme('colors.secondary.DEFAULT');
    }
    
    /* Efecto de escaneo */
    .scanline {
      position: absolute;
      width: 100%;
      height: 2px;
      background: linear-gradient(to right, transparent, theme('colors.primary.DEFAULT'), transparent);
      opacity: 0.7;
      pointer-events: none;
    }
  </style>
</svelte:head>

<button
  type={type}
  disabled={disabled || loading}
  class="relative overflow-hidden border-2 font-bold tracking-wider uppercase transition-all duration-200 ease-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed {sizeClasses[size]} {variantClasses[variant]}"
  class:disabled={disabled}
  class:opacity-50={loading}
  on:click={playClickSound}
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => {
    isHovered = false;
    isPressed = false;
  }}
  on:mousedown={() => isPressed = true}
  on:mouseup={() => isPressed = false}
  on:mousemove={handleMouseMove}
  style="font-family: var(--font-sans);"
>
  <!-- Fondo con efecto de escaneo -->
  <div
    class="absolute inset-0 opacity-10"
    style="background: linear-gradient(90deg, transparent 0%, theme('colors.primary.DEFAULT') 50%, transparent 100%);"
  />
  
  <!-- Efecto de escaneo que sigue al cursor -->
  {#if isHovered}
    <div
      class="scanline"
      style="top: {mouseY}px; left: 0; animation: scanline 0.5s linear;"
      in:fly={{ y: -20, duration: 300, easing: cubicOut }}
      out:fade={{ duration: 200 }}
    />
  {/if}
  
  <!-- Efecto de brillo pulsante -->
  <div
    class="absolute inset-0 opacity-0 transition-opacity duration-300"
    class:opacity-30={isHovered && !isPressed}
    style="background: radial-gradient(circle at center, currentColor 0%, transparent 70%); animation: pulse-glow 2s infinite;"
  />
  
  <!-- Efecto de distorsión glitch en hover -->
  {#if isHovered && !isPressed}
    <div
      class="absolute inset-0 opacity-20 bg-current mix-blend-overlay"
      style="animation: glitch 0.3s infinite;"
    />
  {/if}
  
  <!-- Efecto de presión -->
  <div
    class="absolute inset-0 bg-white opacity-0 transition-opacity duration-100"
    class:opacity-10={isPressed}
  />
  
  <!-- Contenido del botón -->
  <div class="relative z-10 flex items-center justify-center gap-2">
    <!-- Indicador de carga -->
    {#if loading}
      <div class="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" />
    {/if}
    
    <!-- Texto con efecto de parpadeo -->
    <span 
      class="inline-block {loading ? 'opacity-70' : ''}"
      style="animation: flicker 4s infinite; text-shadow: 0 0 5px currentColor; font-family: var(--font-serif);"
    >
      <slot>CYBER BUTTON</slot>
    </span>
    
    <!-- Icono de flecha para hover -->
    {#if isHovered && !loading}
      <span
        class="inline-block transition-transform duration-300"
        class:translate-x-1={isHovered}
        in:fly={{ x: -10, duration: 300 }}
        out:fade={{ duration: 200 }}
      >
        →
      </span>
    {/if}
  </div>
  
  <!-- Borde interior con efecto de escaneo -->
  <div
    class="absolute inset-0 border border-current opacity-20"
    style="clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);"
  />
  
  <!-- Esquinas decorativas -->
  <div class="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current" />
  <div class="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-current" />
  <div class="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-current" />
  <div class="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current" />
  
  <!-- Partículas de efecto en hover -->
  {#if isHovered && !isPressed}
    {#each Array(3) as _, i}
      <div
        class="absolute w-1 h-1 rounded-full bg-current"
        style="
          top: {Math.random() * 100}%;
          left: {Math.random() * 100}%;
          animation: fly {0.5 + Math.random() * 1}s linear infinite;
        "
        in:scale={{ duration: 300 }}
        out:fade={{ duration: 200 }}
      />
    {/each}
  {/if}
</button>

<style>
  /* Animación para partículas */
  @keyframes fly {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-20px) translateX(10px);
      opacity: 0;
    }
  }
  
  /* Asegurar que el botón use las variables de tema */
  button {
    border-radius: var(--radius);
    font-family: var(--font-sans);
  }
  
  /* Efecto de transformación al hacer hover */
  button:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.02);
  }
  
  /* Efecto de presión */
  button:active:not(:disabled) {
    transform: translateY(1px) scale(0.98);
  }
</style>