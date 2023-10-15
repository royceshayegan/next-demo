import Button from "./Button";
import { ColorType, SizeType } from "./types";

export default function Window({
  color,
  size,
  className,
  title,
  dismissable,
  children,
}: {
  color?: ColorType;
  size?: SizeType;
  className?: string;
  title: string;
  dismissable?: string;
  children: React.ReactNode;
}) {
  const baseClass = "window";
  const colorClass: string = color ? `window-${color}` : "window-neutral";
  const sizeClass: string = size ? `window-${size}` : "window-md";
  const combinedClasses = `${baseClass} ${colorClass} ${sizeClass} ${
    className || ""
  }`;
  return (
    <>
      <div className={combinedClasses}>
        <div className="window-titlebar">
          <h1>{title}</h1>
          {dismissable && (
            <Button color="error" variant="close">
              X
            </Button>
          )}
        </div>
        <div className="window-content">{children}</div>
      </div>
    </>
  );
}
