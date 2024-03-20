'use client'

interface Props {
  onClick: () => void
  text: string
}

export const Button = ({ onClick, text }: Props) => {
  return (
    <button
      onClick={onClick}
      className="text-white px-4 py-1 border-2 rounded-full border-[var(--color-tirthy)] hover:bg-[var(--color-tirthy)] hover:text-[var(--color-secondary)] transition-all duration-200"
    >
      {text}
    </button>
  )
}
