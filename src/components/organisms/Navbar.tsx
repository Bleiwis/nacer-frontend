'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '../atoms/NavigationMenu';
import { cn } from '@/lib/utils';

interface NavbarProps {
  avatarUrl?: string;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const pathname = usePathname();

  const isOverview = pathname === '/';
  const isRepositories = pathname === '/repositories';

  return (
    <header className="bg-[#090D16]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-[#30363D]/40 shadow-sm">
      <div className="flex justify-between items-center px-6 py-3 w-full max-w-[1440px] mx-auto">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-lg font-bold text-white tracking-tight hover:opacity-90 transition-opacity"
          >
            Leiwis Bernal
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isOverview &&
                      'bg-[#30363D]/50 text-white font-bold border-b-2 border-[#8B5CF6]',
                  )}
                >
                  Inicio
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/repositories" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isRepositories &&
                      'bg-[#30363D]/50 text-white font-bold border-b-2 border-[#8B5CF6]',
                  )}
                >
                  Repositorios
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};
