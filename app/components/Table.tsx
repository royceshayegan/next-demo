export default function Table({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const baseClass: string = "table-container";
  const combinedClasses: string = `${baseClass} ${className || ""}`;
  return (
    <>
      <div id={id} className={combinedClasses}>
        <table>{children}</table>
      </div>
    </>
  );
}

