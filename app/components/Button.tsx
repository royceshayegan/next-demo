import { AlignmentType, ColorType, SizeType } from "./types";

export default function Button({
  type,
  disabled,
  onClick,
  variant,
  color,
  size,
  className,
  children,
}: {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  variant?: 'default' | 'thin' | 'flat' | 'th' | 'close';
  color?: ColorType;
  size?: SizeType;
  className?: string;
  children: React.ReactNode;
}) {
  const baseClass: string = "wind92-btn";
  const variantClass: string = variant
    ? `wind92-btn-${variant}`
    : "wind92-btn-default";
  const sizeClass: string = size ? `wind92-btn-${size}` : "wind92-btn-md";
  const colorClass: string = color ? `wind92-btn-${color}` : "wind92-btn-neutral";
  const combinedClasses: string = `${baseClass} ${variantClass} ${sizeClass} ${colorClass} ${
    className || ""
  }`;
  return (
    <>
      <button onClick={onClick} type={type} disabled={disabled} className={combinedClasses}>
        {children}
      </button>
    </>
  );
}

function Group({
  alignment,
  children,
}: {
  alignment?: AlignmentType;
  children: React.ReactNode;
}) {
  const baseClass: string = "wind92-btn-group";
  const alignmentClass: string = alignment ? `wind92-btn-group-${alignment}` : 'wind92-btn-group-end';
  const combinedClasses: string = `${baseClass} ${alignmentClass}`;
    return (
        <>
            <div className={combinedClasses} role="group">
              {children}
            </div>
        </>
    )
}

// function Divider({
//   alignment,
//   children,
// }: {
//   alignment?: AlignmentType;
//   children: React.ReactNode;
// }) {
//   const baseClass: string = "wind92-btn-group";
//   const alignmentClass: string = alignment ? `wind92-btn-group-${alignment}` : 'wind92-btn-group-end';
//   const combinedClasses: string = `${baseClass} ${alignmentClass}`;
//     return (
//         <>
//             <div className="">
//               {children}
//             </div>
//         </>
//     )
// }

Button.Group = Group;
// Button.Divider = Divider;