function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 relative z-10 xl:grid-cols-2 justify-between w-full bg-transparent mt-4 gap-4">
      {children}
    </div>
  );
}
export default PageWrapper;
