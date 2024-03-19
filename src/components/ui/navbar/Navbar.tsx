import Link from "next/link"


export const Navbar = () => {
  return (
    <nav className="py-4 sticky top-0 bg-[var(--color-secondary)] flex lg:px-10 justify-between items-center">
      <Link href={'/'}>
        <p className="text-4xl text-white font-bold">DevTalles</p>
      </Link>
      <Link href={'/auth/login'} className="text-white px-4 py-1 border-2 rounded-full border-[var(--color-tirthy)] hover:bg-[var(--color-tirthy)] hover:text-[var(--color-secondary)] transition-all duration-200">Log In</Link>
    </nav>
  )
}
