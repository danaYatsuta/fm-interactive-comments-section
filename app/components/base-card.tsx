export default function BaseCard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="text-grey-500 rounded-md bg-white p-4 shadow-md">
      {children}
    </div>
  );
}
