import confetti from "canvas-confetti"

export const showConfetti = () => {
  confetti({
    zIndex: 999,
    particleCount: 300,
    spread: 160,
    angle: -140,
    origin: {
      x: 0.8,
      y: 0.1
    }
  })
}