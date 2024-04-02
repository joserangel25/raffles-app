'use client'

interface Props {
  onClick: () => void
  text: string
}

export const Button = ({ onClick, text }: Props) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-primary"
    >
      {text}
    </button>
  )
}
