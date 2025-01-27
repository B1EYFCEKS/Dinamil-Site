"use client"

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { ImageIcon, LayoutDashboard, RulerIcon, Table2Icon, UsersIcon} from "lucide-react";
import { usePathname } from "next/navigation";

import { HoverCard } from "radix-ui";


const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"]
})

const routes = [
    {
        label: "Panel",
        icon: LayoutDashboard,
        href: "/admin",
        color: "text-sky-500",
    },
    {
        label: "Categoriler",
        icon: Table2Icon,
        href: "/admin/Tablo",
        color: "text-violet-500",
    },
    {
        label: "Kullanıcı Ekle",
        icon: UsersIcon,
        href: "/admin/Users",
        color: "text-orange-500 ",
    },
    {
        label: "Kullanıcılar",
        icon: UsersIcon,
        href: "/admin/UserList",
        color: "text-blue-500 ",
    },
    {
        label: "Kategoriler",
        icon: ImageIcon,
        href: "/admin/Kategori",
        color: "text-blue-500 ",
    },
    {
        label: "Gereksiz",
        icon: RulerIcon,
        href: "/admin/Gereksiz2",
        color: "text-blue-500 ",
    },
];

const SidebarAD = () => {
    const pathname = usePathname();
    return ( 
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <h1 className={cn("text-2xl font-bold  flex flex-col", montserrat.className)}>
                       Yerli Halı
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", 
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center py-11">
                  <HoverCard.Root>
                    <HoverCard.Trigger asChild>
                      <a
                        className="ImageTrigger"
                        href="https://ocbstd.com"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <Image
                          className="Image normal"
                          width={40}
                          height={40}
                          src="/Logo.png"
                          alt="Radix UI"
                        />
                        
                      </a>
                    </HoverCard.Trigger>
                  </HoverCard.Root>
                </div>
                 

            </div>
        </div>
    );
}
 
export default SidebarAD;