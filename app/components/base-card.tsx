export default function BaseCard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="text-grey-500 rounded-lg bg-white p-4 shadow-md md:rounded-xl md:p-6">
      {children}
    </div>
  );
}
