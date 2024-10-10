function SectionTitle({
  heading,
  desc,
  className,
}: {
  heading: string;
  desc: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="font-bold mb-2 text-main-dark text-[32px]">{heading}</h2>
      <p className="text-main-gray text-sm">{desc}</p>
    </div>
  );
}
export default SectionTitle;
