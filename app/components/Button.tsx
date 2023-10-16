import { AlignmentType, ColorType, SizeType } from "./types";


// This is buggy with tailwind classes. Relies on making a duplicate set of classes just to satisfy the component.
// TODO: find a way to integrate with utilities or remove altogether.
export default function Button({
  id,
  type,
  disabled,
  onClick,
  variant,
  color,
  size,
  className,
  children,
}: {
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  variant?: '' | 'thin' | 'flat' | 'th' | 'close' | 'underline';
  color?: ColorType;
  size?: SizeType;
  className?: string;
  children: React.ReactNode;
}) {
  const baseClass: string = "btn";
  const variantClass: string = variant
    ? `btn-${variant}`
    : '';
  const sizeClass: string = size ? `btn-${size}` : "btn-md";
  const colorClass: string = color ? `filled-${color}` : "filled-surface";
  const combinedClasses: string = `${baseClass} ${variantClass} ${sizeClass} ${colorClass} ${
    className || ""
  }`;
  return (
    <>
      <button id={id} onClick={onClick} type={type} disabled={disabled} className={combinedClasses}>
        {children}
      </button>
    </>
  );
}

function Group({
  id,
  alignment,
  children,
}: {
  id?: string;
  alignment?: AlignmentType;
  children: React.ReactNode;
}) {
  const baseClass: string = "btn-group";
  const alignmentClass: string = alignment ? `btn-group-${alignment}` : 'btn-group-end';
  const combinedClasses: string = `${baseClass} ${alignmentClass}`;
    return (
        <>
            <div id={id} className={combinedClasses} role="group">
              {children}
            </div>
        </>
    )
}

Button.Group = Group;