'use client';

import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import '../lib/i18n-client';

const NavigationBar = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { href: '/', label: t('nav.home'), isScroll: false },
    { href: '#works', label: t('nav.works'), isScroll: true },
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
    <div className="w-full flex justify-center items-center py-4">
      <NavigationMenu>
        <NavigationMenuList>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'text-xl font-medium transition-colors bg-unset hover:bg-unset focus:bg-unset hover:text-white',
                  pathname === item.href ? 'text-black font-bold' : 'text-black'
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
