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
    { href: '/', label: 'HOME', isScroll: false },
    { href: '#works', label: 'WORKS', isScroll: true },
  ];

  const handleNavClick = (item: { href: string; label: string; isScroll: boolean }, e: React.MouseEvent) => {
    if (item.isScroll) {
      e.preventDefault();
      const element = document.getElementById('works');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full border-b border-[#FFD700] border-b-2 border-dashed py-4">
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
                onClick={(e) => handleNavClick(item, e)}
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
