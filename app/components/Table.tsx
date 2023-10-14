export default function Table({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const baseClass: string = "wind92-table";
  const combinedClasses: string = `${baseClass} ${className || ""}`;
  return (
    <>
      <div className={combinedClasses}>
        <table>{children}</table>
      </div>
    </>
  );
}

