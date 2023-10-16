interface TableProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Table(props: TableProps) {
  const baseClass: string = "table-container";
  const combinedClasses: string = `${baseClass} ${props.className || ""}`;
  return (
    <>
      <div id={props.id} className={combinedClasses}>
        <table>{props.children}</table>
      </div>
    </>
  );
}

