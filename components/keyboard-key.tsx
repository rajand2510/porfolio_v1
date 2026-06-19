type KeyProps = {
  label: string;
  sublabel?: string;
  wide?: boolean;
  active?: boolean;
  pressed?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function KeyboardKey({
  label,
  sublabel,
  wide,
  active,
  pressed,
  onClick,
  className = "",
}: KeyProps) {
  const Tag = onClick ? "button" : "div";

  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center rounded-md border-2 font-mono text-[0.6rem] sm:text-xs select-none transition-all duration-150 w-full min-w-0 h-full min-h-[2.5rem] sm:min-h-[3rem]
        ${active ? "border-accent bg-accent text-white shadow-[0_4px_0_#b83d1f]" : "border-line bg-[var(--key-bg)] text-ink"}
        ${pressed ? "translate-y-1 shadow-none" : active ? "" : "shadow-[0_4px_0_var(--border)]"}
        ${onClick && !active ? "hover:border-accent/60 cursor-pointer" : ""}
        ${className}
      `}
    >
      <span className="font-semibold">{label}</span>
      {sublabel && (
        <span className="text-[0.6rem] opacity-60 mt-0.5">{sublabel}</span>
      )}
    </Tag>
  );
}
