'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const NavigationBar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/models', label: 'MODELS' },
    { href: '/about', label: 'ABOUT' },
  ];

  return (
    <div className="flex justify-center items-center w-full border-b border-[#FFD700] border-b-2 border-dashed  py-4">
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'text-sm font-medium transition-colors bg-unset hover:bg-unset focus:bg-unset',
                  pathname === item.href ? 'text-black font-bold' : 'text-gray-600'
                )}
                href={item.href}
              >
                {item.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavigationBar;
