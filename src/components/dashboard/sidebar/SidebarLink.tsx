'use client'
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

interface Props {
  label: string;
  href: string;
  icon: React.ReactNode
}

export const SidebarLink = ({ label, href, icon }: Props) => {
  const pathName = usePathname()

  return (
    <Link href={href} className="">
      <li className={`p-4 rounded-xl bg-tirthy  hover:opacity-100 min-w-[200px] font-bold capitalize hover:bg-ligth flex gap-3 items-center transition-all duration-150
        ${pathName.includes(href) ? 'text-secondary' : 'text-white opacity-80'}
      `}>
        <span className="text-xl w-6 ">
          {icon}
        </span>
        {label}
      </li>
    </Link>
  )
}
