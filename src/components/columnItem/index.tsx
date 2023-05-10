export const ColumnItem: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex items-center justify-start h-full">{children}</div>
  );
};
