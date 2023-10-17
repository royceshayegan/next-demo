import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { AlignmentType, ColorType, SizeType } from "./types";

interface InputProps {
  test: string;
  children?: React.ReactNode;
}

type Props = InputProps & InputHTMLAttributes<HTMLInputElement>;
export default function Input(props: Props) {
  return (
    <>
      <div className="form-control">
        <input>{props.children}</input>
      </div>
    </>
  );
}
