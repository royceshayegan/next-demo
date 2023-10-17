import { HTMLAttributes } from "react";
import Button from "./Button";
import { ColorType, SizeType } from "./types";

// TODO: Figure out why HTMLAttributes isnt working as expected.


interface WindowProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  onDismiss?: React.MouseEventHandler<HTMLButtonElement>;
  color?: ColorType;
  size?: SizeType;
  children: React.ReactNode;
}

export default function Window(props: WindowProps) {
  const baseClass = "window";
  const colorClass: string = props.color ? `filled-${props.color}` : "filled-surface";
  const sizeClass: string = props.size ? `window-${props.size}` : "window-md";
  const combinedClasses = `${baseClass} filled-surface ${sizeClass} ${
    props.className || ""
  }`;
  return (
    <>
      <div {...props} className={combinedClasses}>
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


// interface WindowProps {
//   id?: string;
//   color?: ColorType;
//   size?: SizeType;
//   className?: string;
//   title: string;
//   onDismiss?: React.MouseEventHandler<HTMLButtonElement>;
//   children: React.ReactNode;
// }

// export default function Window(props: WindowProps) {
//   const baseClass = "window";
//   const colorClass: string = props.color
//     ? `filled-${props.color}`
//     : "filled-surface";
//   const sizeClass: string = props.size ? `window-${props.size}` : "window-md";
//   const combinedClasses = `${baseClass} filled-surface ${sizeClass} ${
//     props.className || ""
//   }`;
//   return (
//     <>
//       <div className={combinedClasses}>
//         <div className={`window-titlebar ${colorClass}`}>
//           <h1>{props.title}</h1>
//           {props.onDismiss && (
//             <Button variant="close" color="error" onClick={props.onDismiss}>
//               X
//             </Button>
//           )}
//         </div>
//         <div className="window-content">{props.children}</div>
//       </div>
//     </>
//   );
// }
