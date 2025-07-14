'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n-client';

const NavigationBar = () => {
  const { t } = useTranslation();

  const navItems = [
    // { target: 'home', label: t('nav.home'), isScroll: true },
    { target: 'works', label: t('nav.works'), isScroll: true },
  ];

  const handleNavClick = (item: { target: string; label: string; isScroll: boolean }, e: React.MouseEvent) => {
    if (item.isScroll) {
      e.preventDefault();
      const element = document.getElementById(item.target);
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
            <NavigationMenuItem key={item.target}>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'text-xl font-medium transition-colors bg-unset hover:bg-unset focus:bg-unset hover:text-white'
                )}
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
