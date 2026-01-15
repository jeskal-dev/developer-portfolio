import { cn } from "@/helpers/classname";
import "./card.css";
import {
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
} from "preact/compat";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  active?: boolean;
}

const CardRoot = ({ children, className, active, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "cyber-clip group relative w-full max-w-md bg-border p-px transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_20px_-10px_var(--color-primary)]",
        className
      )}
      {...props}
    >
      <div className="cyber-clip relative h-full w-full overflow-hidden bg-bg p-1">
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="animate-scan absolute inset-0 h-[50%] bg-linear-to-b from-transparent via-primary/5 to-transparent opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(0,0,255,0.06))]" />
          <div className="absolute -inset-full bg-[radial-gradient(circle,var(--color-primary)_0%,transparent_50%)] opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-20">
          <span
            className={cn(
              "absolute left-0 top-0 h-0.5 w-8 shadow-[0_0_8px_var(--color-accent)] transition-colors duration-300",
              active ? "bg-danger shadow-danger" : "bg-accent"
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-0 h-8 w-0.5 shadow-[0_0_8px_var(--color-accent)] transition-colors duration-300",
              active ? "bg-danger shadow-danger" : "bg-accent"
            )}
          />
          <span className="absolute bottom-0 right-0 h-1.5 w-12 bg-primary/50 group-hover:bg-primary transition-colors" />
          <span className="absolute top-2 right-2 h-1 w-1 rounded-full bg-primary/30" />
          <span className="absolute bottom-2 left-2 h-1 w-1 rounded-full bg-primary/30" />
        </div>

        {/* Contenido Real */}
        <div className="relative z-10 flex h-full flex-col">{children}</div>
      </div>
    </div>
  );
};

interface HeaderProps {
  title: string;
  subtitle?: string;
  tag?: string;
  icon?: ReactNode;
  className?: string;
}

const Header = ({
  title,
  subtitle,
  tag = "SYSTEM // READY",
  icon,
  className,
}: HeaderProps) => (
  <div
    className={cn(
      "relative mb-4 flex items-start justify-between border-b border-primary/10 px-6 pb-4 pt-6 font-mono",
      className
    )}
  >
    <div className="flex flex-col gap-1">
      <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest text-accent/80">
        <span className="h-1.5 w-1.5 animate-pulse bg-accent shadow-[0_0_5px_var(--color-accent)]" />
        {tag}
      </span>
      <h2 className="text-lg font-bold uppercase tracking-[0.15em] text-primary drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
        {title}
      </h2>
    </div>

    <div className="flex flex-col items-end justify-between self-stretch">
      {icon && <div className="text-primary/80">{icon}</div>}
      {subtitle && (
        <span className="mt-auto text-[9px] font-medium text-muted/60 tabular-nums tracking-wider">
          {subtitle}
        </span>
      )}
    </div>
  </div>
);

interface FooterProps extends HTMLAttributes<HTMLElement> {
  divider?: boolean;
}

const Left = ({ children }: PropsWithChildren) => (
  <div className="flex-1 flex justify-start">{children}</div>
);
const Center = ({ children }: PropsWithChildren) => (
  <div className="flex-1 flex justify-center">{children}</div>
);
const Right = ({ children }: PropsWithChildren) => (
  <div className="flex-1 flex justify-end">{children}</div>
);

const Footer = ({
  children,
  className,
  divider = true,
  ...props
}: FooterProps) => {
  return (
    <footer
      className={cn("relative mt-auto w-full px-6 pb-6 pt-4", className)}
      {...props}
    >
      {divider && (
        <div
          className="absolute left-6 right-6 top-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"
          aria-hidden="true"
        />
      )}
      <div className="flex items-center justify-between gap-4 font-mono text-xs">
        {children}
      </div>
    </footer>
  );
};

interface BodyProps extends HTMLAttributes<HTMLDivElement> {}

const Body = ({ children, className, ...props }: BodyProps) => (
  <div
    className={cn("grow px-6 py-2 font-mono text-sm text-muted/90", className)}
    {...props}
  >
    {children}
  </div>
);

export default Object.assign(CardRoot, {
  Header,
  Footer: Object.assign(Footer, { Right, Left, Center }),
  Body,
});
