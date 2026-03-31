'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Store,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

interface SellerSidebarProps {
  sellerName?: string;
}

export function SellerSidebar({ sellerName = 'Ma Boutique' }: SellerSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();

  const navItems = [
    {
      label: 'Tableau de bord',
      icon: LayoutDashboard,
      href: '/seller/dashboard',
    },
    {
      label: 'Mes Produits',
      icon: Package,
      href: '/seller/products',
    },
    {
      label: 'Commandes',
      icon: ClipboardList,
      href: '/seller/orders',
    },
    {
      label: 'Ma Boutique',
      icon: Store,
      href: '/seller/store',
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className={`${collapsed ? 'w-20' : 'w-64'} h-screen sticky top-0 flex flex-col transition-all duration-300`}
      style={{
        backgroundColor: '#19244B',
      }}
    >
      {/* Header */}
      <div
        className={`p-6 border-b ${collapsed ? 'px-4' : ''}`}
        style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <Link href="/seller/dashboard" className="flex items-center gap-3">
          <div className="relative h-10 w-10 flex-shrink-0">
             {/* Replace src with your local path or imported asset */}
            <div className="bg-indigo-500 rounded-lg h-full w-full flex items-center justify-center text-white font-bold">A</div>
          </div>
          {!collapsed && (
            <div>
              <div className="text-sm font-semibold text-white">Atlas</div>
              <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Espace vendeur
              </div>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-3 py-2.5 rounded-lg transition-all relative group`}
                style={active ? {
                  borderLeft: '3px solid #4F46E5',
                  paddingLeft: collapsed ? 'calc(0.75rem - 3px)' : 'calc(0.75rem - 3px)',
                  backgroundColor: 'rgba(79, 70, 229, 0.15)',
                } : {}}
              >
                <Icon
                  className="h-5 w-5 flex-shrink-0"
                  style={{
                    color: active ? '#4F46E5' : 'rgba(255, 255, 255, 0.6)',
                    strokeWidth: 2,
                  }}
                />
                {!collapsed && (
                  <span
                    className="text-sm font-medium"
                    style={{ color: active ? '#ffffff' : 'rgba(255, 255, 255, 0.6)' }}
                  >
                    {item.label}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
        <div className="p-4">
          <Button
            variant="ghost"
            className={`w-full ${collapsed ? 'justify-center px-0' : 'justify-start gap-3'} hover:bg-white/10`}
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            asChild
            onClick={() => logout()}
          >
            <Link href="/">
              <LogOut className="h-5 w-5 flex-shrink-0" style={{ strokeWidth: 2 }} />
              {!collapsed && <span className="text-sm font-medium">Déconnexion</span>}
            </Link>
          </Button>
        </div>

        {/* Toggle button */}
        <div className="p-4 pt-0">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center py-2 rounded-lg hover:bg-white/10 transition-colors"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            <ChevronLeft
              className={`h-5 w-5 transition-transform ${collapsed ? 'rotate-180' : ''}`}
              style={{ strokeWidth: 2 }}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}