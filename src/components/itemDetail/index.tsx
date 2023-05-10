export const ItemDetail: React.FC<{
  title: string;
  detail: string | React.ReactNode;
}> = ({ title, detail }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="text-sm text-blue-100">{title}</div>
      <div className="text-white font-bold">{detail}</div>
    </div>
  );
};
