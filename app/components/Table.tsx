export default function Table({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const baseClass: string = "table-container";
  const combinedClasses: string = `${baseClass} ${className || ""}`;
  return (
    <>
      <div className={combinedClasses}>
        <table>{children}</table>
      </div>
    </>
  );
}

