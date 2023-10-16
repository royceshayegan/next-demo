import Button from "./Button";
import { ColorType, SizeType } from "./types";

// This is buggy with tailwind classes. Relies on making a duplicate set of classes just to satisfy the component.
// TODO: find a way to integrate with utilities or remove altogether.
export default function Window({
  color,
  size,
  className,
  title,
  onDismiss,
  children,
}: {
  color?: ColorType;
  size?: SizeType;
  className?: string;
  title: string;
  onDismiss?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}) {
  const baseClass = "window";
  const colorClass: string = color ? `filled-${color}` : "filled-surface";
  const sizeClass: string = size ? `window-${size}` : "window-md";
  const combinedClasses = `${baseClass} filled-surface ${sizeClass} ${
    className || ""
  }`;
  return (
    <>
      <div className={combinedClasses}>
        <div className={`window-titlebar ${colorClass}`}>
          <h1>{title}</h1>
          {onDismiss && (
            <Button variant="close" color="error" onClick={onDismiss}>X</Button>
          )}
        </div>
        <div className="window-content">{children}</div>
      </div>
    </>
  );
}
