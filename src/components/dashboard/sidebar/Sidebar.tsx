import Image from "next/image"
import { SidebarLink } from "./SidebarLink"
import { LINKS_SIDEBAR } from "@/constants"


export const Sidebar = () => {
  return (
    <aside className='bg-secondary h-full w-full rounded-xl py-3 '>
      <Image
        src={'/images/devi/wink.webp'}
        alt="Icono de Devi en el sidebar"
        height={100}
        width={100}
        className="mx-auto mb-3"
      />
      <div className=" space-y-3 px-3">
        <ul className="flex md:flex-col gap-3 mb-3 overflow-x-auto">
          {
            LINKS_SIDEBAR.map(link => (
              <SidebarLink key={link.href} {...link} />
            ))
          }
        </ul>
      </div>
    </aside>
  )
}
