"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  User,
  Menu,
  LogOut,
  Package,
  LayoutDashboard,
  ShieldCheck,
  Store,
  Users,
  BarChart2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import logo from "@/assets/Atlas_logo_blanc.png";

// ─── Types ───────────────────────────────────────────────────────────────────

type Role = "CLIENT" | "SELLER" | "ADMIN" | null;

interface HeaderProps {
  cartCount?: number;
}

// ─── Nav config per role ─────────────────────────────────────────────────────

const NAV_LINKS: Record<
  NonNullable<Role> | "VISITOR",
  { label: string; href: string }[]
> = {
  VISITOR: [
    { label: "Home", href: "/" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Vendeurs", href: "/vendeurs" },
    { label: "À propos", href: "/about" },
  ],
  CLIENT: [
    { label: "Home", href: "/" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Vendeurs", href: "/vendeurs" },
    { label: "À propos", href: "/about" },
  ],
  SELLER: [
    { label: "Home", href: "/" },
    { label: "Mes produits", href: "/seller/products" },
    { label: "Mes ventes", href: "/seller/orders" },
    { label: "À propos", href: "/about" },
  ],
  ADMIN: [
    { label: "Home", href: "/" },
    { label: "Utilisateurs", href: "/admin/users" },
    { label: "Produits", href: "/admin/products" },
    { label: "Vendeurs", href: "/admin/sellers" },
  ],
};

// ─── Header style per role ───────────────────────────────────────────────────

const HEADER_STYLE: Record<NonNullable<Role> | "VISITOR", React.CSSProperties> = {
  VISITOR: {
    background: "rgba(13, 27, 62, 0.8)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  CLIENT: {
    background: "rgba(13, 27, 62, 0.8)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  SELLER: {
    background: "rgba(17, 24, 39, 0.85)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(99, 102, 241, 0.3)",
  },
  ADMIN: {
    background: "rgba(30, 10, 10, 0.92)",
    backdropFilter: "blur(12px)",
    borderBottom: "2px solid rgba(239, 68, 68, 0.5)",
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Header({ cartCount = 0 }: HeaderProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const role = (user?.role as Role) ?? null;
  const roleKey: NonNullable<Role> | "VISITOR" =
    isAuthenticated && role ? role : "VISITOR";

  const userName = user?.name || "Utilisateur";
  const initials = userName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const navLinks = NAV_LINKS[roleKey];
  const headerStyle = HEADER_STYLE[roleKey];

  return (
    <header className="sticky top-0 z-50 w-full" style={headerStyle}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 shrink-0 cursor-pointer">
            <Image src={logo} alt="Atlas" width={50} height={50} />
            <div className="relative">
              <span className="text-2xl font-semibold text-white">Atlas</span>
              {/* Accent bar changes colour for ADMIN */}
              <div
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                style={{
                  background:
                    roleKey === "ADMIN"
                      ? "linear-gradient(90deg, #EF4444 0%, #B91C1C 100%)"
                      : "linear-gradient(90deg, #4F46E5 0%, #2563EB 100%)",
                }}
              />
            </div>
          </Link>

          {/* ── Role badge (ADMIN / SELLER only) ── */}
          {roleKey === "ADMIN" && (
            <span className="hidden md:flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-red-400 border border-red-500/40 rounded-full px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin
            </span>
          )}
          {roleKey === "SELLER" && (
            <span className="hidden md:flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-indigo-300 border border-indigo-500/40 rounded-full px-3 py-1">
              <Store className="h-3.5 w-3.5" />
              Vendeur
            </span>
          )}

          {/* ── Nav ── */}
          <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-white/80 hover:text-white transition-colors font-medium"
                style={{ fontSize: "15px" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Right-side actions ── */}
          <div className="flex items-center gap-3">

            {/* Cart — CLIENT only */}
            {roleKey === "CLIENT" && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-white hover:bg-white/10 relative"
                asChild
              >
                <Link href="/client/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-indigo-600 text-xs flex items-center justify-center text-white">
                      {cartCount}
                    </span>
                  )}
                  <span className="sr-only">Panier</span>
                </Link>
              </Button>
            )}

            {/* Authenticated — Avatar dropdown */}
            {roleKey !== "VISITOR" && (
              /* Authenticated — Avatar dropdown */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-0.5 transition-colors cursor-pointer">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback
                        className="text-white"
                        style={{
                          background:
                            roleKey === "ADMIN"
                              ? "#EF4444"
                              : roleKey === "SELLER"
                              ? "#6366F1"
                              : "#4F46E5",
                        }}
                      >
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Menu utilisateur</span>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white border-border"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--border-section)",
                  }}
                >
                  {/* Name + role label */}
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {userName}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {roleKey.toLowerCase()}
                    </p>
                  </div>

                  {/* CLIENT items */}
                  {roleKey === "CLIENT" && (
                    <>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/client/profile" className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-gray-600" />
                          Mon profil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/client/orders" className="flex items-center">
                          <Package className="mr-2 h-4 w-4 text-gray-600" />
                          Mes commandes
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {/* SELLER items */}
                  {roleKey === "SELLER" && (
                    <>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/seller/profile" className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-gray-600" />
                          Mon profil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/seller/dashboard" className="flex items-center">
                          <LayoutDashboard className="mr-2 h-4 w-4 text-gray-600" />
                          Tableau de bord
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/seller/orders" className="flex items-center">
                          <BarChart2 className="mr-2 h-4 w-4 text-gray-600" />
                          Mes ventes
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {/* ADMIN items */}
                  {roleKey === "ADMIN" && (
                    <>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/admin/dashboard" className="flex items-center">
                          <ShieldCheck className="mr-2 h-4 w-4 text-red-500" />
                          Dashboard admin
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/admin/users" className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-gray-600" />
                          Utilisateurs
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white/80 hover:text-white hover:bg-white/10 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}