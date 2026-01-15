import { useRef, type ReactNode } from "preact/compat";
import "./transition.css";

type TransitionType = "fade" | "slide" | "scale" | "rotate" | "flip";

type TransitionItems<T extends string = string> =
  | [ReactNode, ReactNode]
  | Record<T, ReactNode>;

type TransitionStep<
  T extends TransitionItems<U>,
  U extends string = string
> = T extends [ReactNode, ReactNode] ? 0 | 1 : U;

function isTuple<T extends string = string>(
  element: TransitionItems<T>
): element is [ReactNode, ReactNode] {
  return Array.isArray(element);
}

function isDict<T extends string = string>(
  element: TransitionItems<T>
): element is Record<T, ReactNode> {
  return typeof element === "object";
}

interface TransitionProps<
  TStep extends string,
  TSteps extends TransitionItems<TStep>
> {
  steps: TSteps;
  step: TransitionStep<TSteps, TStep>;
  type?: TransitionType;
  duration?: number;
  size?: number;
  className?: string;
}

const Transition = <
  TStep extends string,
  TSteps extends TransitionItems<TStep>
>({
  steps,
  step,
  className,
  duration = 0.3,
  type = "fade",
  size = 24,
}: TransitionProps<TStep, TSteps>) => {
  const firstClick = useRef(false);
  const IconComponent = () => {
    if (isTuple(steps)) {
      const index = step as TransitionStep<[ReactNode, ReactNode]>;
      return steps[index];
    }

    if (isDict(steps)) {
      const index = step as TStep;
      return steps[index];
    }

    throw new Error("Invalid transition step");
  };

  return (
    <div
      className={`transition-wrapper ${className}`}
      onClick={() => {
        if (!firstClick.current) firstClick.current = true;
      }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        "--duration": `${duration}s`,
      }}
    >
      <div
        key={step}
        className={`transition ${firstClick.current && type}`}
        style={{
          animationDuration: `${duration}s`,
        }}
      >
        <IconComponent />
      </div>
    </div>
  );
};

export default Transition;

