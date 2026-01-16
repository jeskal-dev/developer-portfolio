import type { PropsWithChildren } from "preact/compat";
import { cardShape, cardStyles } from "./card.style";
import Frame from "../frame/frame";

export function Card({ children }: PropsWithChildren) {
  return (
    <div className={cardStyles}>
      <Frame
        className="drop-shadow-2xl drop-shadow-primary/50"
        paths={cardShape}
      />
      {children}
    </div>
  );
}

