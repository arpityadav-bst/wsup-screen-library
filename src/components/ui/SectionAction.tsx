interface SectionActionProps {
  onClick: () => void
  children: React.ReactNode
}

export default function SectionAction({ onClick, children }: SectionActionProps) {
  return (
    <button
      onClick={onClick}
      className="text-secondary text-xxs font-semibold tracking-[0.8px] bg-transparent border-none cursor-pointer uppercase"
    >
      {children}
    </button>
  )
}
