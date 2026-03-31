'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Store, RefreshCw } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function RoleSwitcher() {
  const { user, switchRole, logout } = useAuth();
  const router = useRouter();

  // ── Guard before any user access ────────────────────────────────────────────
  if (!user) return null;

  const isVendor = user.role === 'VENDEUR' || user.role === 'seller';
  const handleSwitchToClient = () => {
    switchRole('CLIENT');
    router.push('/');
  };

  const handleSwitchToVendeur = () => {
    switchRole('VENDEUR');
    router.push('/dashboard');   // (vendor) route group → real URL is /dashboard
  };


  const handleLogout = () => {
    logout();
    router.push('/register');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-[20px] right-[20px] z-[9999] gap-2 bg-[#4F46E5] text-white border-[#4F46E5] hover:bg-[#4338ca] hover:text-white"
        >
          <RefreshCw className="h-4 w-4" />
          <span className="hidden sm:inline">Tester les rôles</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <span>Rôle actuel :</span>
            <Badge
              className={
                isVendor
                  ? 'bg-purple-500/20 text-purple-700 hover:bg-purple-500/20'
                  : 'bg-blue-500/20 text-blue-700 hover:bg-blue-500/20'
              }
            >
              {isVendor ? 'Vendeur' : 'Acheteur'}
            </Badge>
          </div>
          {user.name && (
            <div className="text-xs text-muted-foreground mt-1">{user.name}</div>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSwitchToClient}
          disabled={user.role === 'CLIENT'}
        >
          <User className="mr-2 h-4 w-4" />
          <span>Basculer en Acheteur</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleSwitchToVendeur}
          disabled={user.role === 'VENDEUR'}
        >
          <Store className="mr-2 h-4 w-4" />
          <span>Basculer en Vendeur</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 focus:text-red-600"
        >
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}