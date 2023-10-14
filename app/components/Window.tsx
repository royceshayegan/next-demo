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
  const baseClass = "wind92-window";
  const colorClass: string = color ? `wind92-window-${color}` : "wind92-window-neutral";
  const sizeClass: string = size ? `wind92-window-${size}` : "wind92-window-md";
  const combinedClasses = `${baseClass} ${colorClass} ${sizeClass} ${
    className || ""
  }`;
  return (
    <>
      <div className={combinedClasses}>
        <div className="wind92-window-titlebar">
          <h1>{title}</h1>
          {dismissable && (
            <Button color="error" variant="close">
              X
            </Button>
          )}
        </div>
        <div className="wind92-window-content">{children}</div>
      </div>
    </>
  );
}
