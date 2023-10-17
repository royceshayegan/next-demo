import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { AlignmentType, ColorType, SizeType } from "./types";

// TODO: Figure out why HTMLAttributes isnt working as expected.

interface ButtonProps {
  id?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "" | "thin" | "flat" | "th" | "close" | "underline";
  color?: ColorType;
  size?: SizeType;
  className?: string;
  children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  const baseClass: string = "btn";
  const variantClass: string = props.variant ? `btn-${props.variant}` : "";
  const sizeClass: string = props.size ? `btn-${props.size}` : "btn-md";
  const colorClass: string = props.color
    ? `filled-${props.color}`
    : "filled-surface";
  const combinedClasses: string = `${baseClass} ${variantClass} ${sizeClass} ${colorClass} ${
    props.className || ""
  }`;
  return (
    <>
      <button
        id={props.id}
        onClick={props.onClick}
        type={props.type}
        disabled={props.disabled}
        className={combinedClasses}
      >
        {props.children}
      </button>
    </>
  );
}

interface ButtonGroupProps {
  id?: string;
  alignment?: AlignmentType;
  children: React.ReactNode;
}

function Group(props: ButtonGroupProps) {
  const baseClass: string = "btn-group";
  const alignmentClass: string = props.alignment
    ? `justify-${props.alignment}`
    : "justify-end";
  const combinedClasses: string = `${baseClass} ${alignmentClass}`;
  return (
    <>
      <div id={props.id} className={combinedClasses} role="group">
        {props.children}
      </div>
    </>
  );
}

// interface ButtonProps {
//   variant?: "" | "thin" | "flat" | "th" | "close" | "underline";
//   color?: ColorType;
//   size?: SizeType;
//   children: React.ReactNode;
// }

// export default function Button(
//   props: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
// ) {
//   const baseClass: string = "btn";
//   const variantClass: string = props.variant ? `btn-${props.variant}` : "";
//   const sizeClass: string = props.size ? `btn-${props.size}` : "btn-md";
//   const colorClass: string = props.color
//     ? `filled-${props.color}`
//     : "filled-surface";
//   const combinedClasses: string = `${baseClass} ${variantClass} ${sizeClass} ${colorClass} ${
//     props.className || ""
//   }`;
//   return (
//     <>
//       <button className={combinedClasses} {...props} >{props.children}</button>
//     </>
//   );
// }

// interface ButtonGroupProps {
//   alignment?: AlignmentType;
//   children: React.ReactNode;
// }

// function Group(props: ButtonGroupProps & HTMLAttributes<HTMLElement>) {
//   const baseClass: string = "btn-group";
//   const alignmentClass: string = props.alignment
//     ? `justify-${props.alignment}`
//     : "justify-end";
//   const combinedClasses: string = `${baseClass} ${alignmentClass}`;
//   return (
//     <>
//       <div className={combinedClasses} role="group">
//         {props.children}
//       </div>
//     </>
//   );
// }

Button.Group = Group;
