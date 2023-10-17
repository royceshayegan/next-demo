import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { AlignmentType, ColorType, SizeType } from "./types";

interface ButtonProps {
  variant?: "" | "thin" | "flat" | "th" | "close" | "underline";
  color?: ColorType;
  size?: SizeType;
  children: React.ReactNode;
}

export default function Button(
  props: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
) {
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
      <button className={combinedClasses}>{props.children}</button>
    </>
  );
}

interface ButtonGroupProps {
  alignment?: AlignmentType;
  children: React.ReactNode;
}

function Group(props: ButtonGroupProps & HTMLAttributes<HTMLElement>) {
  const baseClass: string = "btn-group";
  const alignmentClass: string = props.alignment
    ? `justify-${props.alignment}`
    : "justify-end";
  const combinedClasses: string = `${baseClass} ${alignmentClass}`;
  return (
    <>
      <div className={combinedClasses} role="group">
        {props.children}
      </div>
    </>
  );
}

Button.Group = Group;
