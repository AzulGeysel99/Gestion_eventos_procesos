'use client'


import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';



   
    const sidebarlinks = [
        {name:'Pages', href: '/pages', icon: HomeIcon},
        {name:'Usuarios', href: '/pages/usuarios', icon: DocumentDuplicateIcon}
        

    ];

    export default function NavSidebar() {
        const pathname = usePathname();
      
        return (
          <>
            {sidebarlinks.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                >
                  <a
                    className={`flex h-48 items-center justify-between gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
                      ${pathname === link.href ? 'bg-sky-100 text-blue-600' : ''}
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-6" />
                      <p className="hidden md:block">{link.name}</p>
                    </div>
                  </a>
                </Link>
              );
            })}
          </>
        );
      }