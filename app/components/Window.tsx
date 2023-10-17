import { HTMLAttributes } from "react";
import Button from "./Button";
import { ColorType, SizeType } from "./types";

interface WindowProps {
  title: string;
  onDismiss?: React.MouseEventHandler<HTMLButtonElement>;
  color?: ColorType;
  size?: SizeType;
  children: React.ReactNode;
}

export default function Window(props: WindowProps & HTMLAttributes<HTMLElement>) {
  const baseClass = "window";
  const colorClass: string = props.color ? `filled-${props.color}` : "filled-surface";
  const sizeClass: string = props.size ? `window-${props.size}` : "window-md";
  const combinedClasses = `${baseClass} filled-surface ${sizeClass} ${
    props.className || ""
  }`;
  return (
    <>
      <div className={combinedClasses}>
        <div className={`window-titlebar ${colorClass}`}>
          <h1>{props.title}</h1>
          {props.onDismiss && (
            <Button variant="close" color="error" onClick={props.onDismiss}>X</Button>
          )}
        </div>
        <div className="window-content">{props.children}</div>
      </div>
    </>
  );
}
