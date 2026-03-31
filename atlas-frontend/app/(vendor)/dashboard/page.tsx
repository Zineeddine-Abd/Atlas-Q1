'use client';

import { SellerSidebar } from '@/components/SellerSidebar';
import { Card } from '@/components/ui/Card';
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import {
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingBag,
  BarChart3,
  Star,
  AlertCircle,
} from 'lucide-react';
import Image from 'next/image'; // Optimized Next.js Image component

const kpiData = {
  revenue: { value: '45 280 €', trend: '+12.5%', isPositive: true },
  orders: { value: '356', trend: '+8.2%', isPositive: true },
  activeProducts: { value: '127', trend: '+5.1%', isPositive: true },
  averageRating: { value: '4.8', trend: '+0.3', isPositive: true },
};

const topProducts = [
  {
    id: 1,
    name: 'Écouteurs Sans Fil Premium',
    category: 'Audio',
    unitsSold: 145,
    revenue: 21735,
    image: 'https://images.unsplash.com/photo-1591923271591-478bb32b57ca?q=80&w=400',
  },
  {
    id: 2,
    name: 'Clavier Mécanique RGB',
    category: 'Périphériques',
    unitsSold: 98,
    revenue: 12739,
    image: 'https://images.unsplash.com/photo-1649899913123-90bb33c8a66a?q=80&w=400',
  },
  {
    id: 3,
    name: 'Souris Gaming Pro',
    category: 'Gaming',
    unitsSold: 87,
    revenue: 6960,
    image: 'https://images.unsplash.com/photo-1628832307345-7404b47f1751?q=80&w=400',
  },
  {
    id: 4,
    name: 'Webcam 4K',
    category: 'Vidéo',
    unitsSold: 65,
    revenue: 9750,
    image: 'https://images.unsplash.com/photo-1614588876378-b2ffa4520c22?q=80&w=400',
  },
  {
    id: 5,
    name: 'Microphone USB',
    category: 'Audio',
    unitsSold: 54,
    revenue: 5940,
    image: 'https://images.unsplash.com/photo-1652071148620-99be24e731a8?q=80&w=400',
  },
];

const criticalStockAlerts = [
  { productName: 'Écouteurs Sans Fil Premium', variant: 'Noir', stock: 2 },
  { productName: 'Clavier Mécanique RGB', variant: 'Blanc / Cherry MX Blue', stock: 3 },
  { productName: 'Webcam 4K', variant: 'Standard', stock: 1 },
  { productName: 'Support Laptop', variant: 'Aluminium', stock: 4 },
];

const recentOrders = [
  { id: 'ATL-2026-001', client: 'J. Dupont', items: 2, amount: 299.98, status: 'EN_ATTENTE' as const },
  { id: 'ATL-2026-002', client: 'M. Laurent', items: 1, amount: 149.99, status: 'EN_PREPARATION' as const },
  { id: 'ATL-2026-003', client: 'S. Martin', items: 3, amount: 419.97, status: 'EXPEDIE' as const },
  { id: 'ATL-2026-004', client: 'P. Bernard', items: 1, amount: 79.99, status: 'LIVRE' as const },
  { id: 'ATL-2026-005', client: 'C. Dubois', items: 2, amount: 259.98, status: 'EN_PREPARATION' as const },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'EN_ATTENTE': return 'bg-gray-500/20 text-gray-500';
    case 'EN_PREPARATION': return 'bg-orange-500/20 text-orange-500';
    case 'EXPEDIE': return 'bg-blue-500/20 text-blue-500';
    case 'LIVRE': return 'bg-green-500/20 text-green-500';
    default: return 'bg-gray-500/20 text-gray-500';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'EN_ATTENTE': return 'En attente';
    case 'EN_PREPARATION': return 'En préparation';
    case 'EXPEDIE': return 'Expédié';
    case 'LIVRE': return 'Livré';
    default: return status;
  }
};

export default function SellerDashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      <SellerSidebar sellerName="Tech Paradise" />

      <main className="flex-1 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#0D1B3E]">
            Tableau de bord
          </h1>
          <p className="text-sm text-[#6F727B]">
            Bienvenue, voici un aperçu de votre activité
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Mapping through KPIs would be cleaner, but keeping your structure for consistency */}
          {[
            { label: "Chiffre d'Affaires", data: kpiData.revenue, icon: BarChart3 },
            { label: "Commandes", data: kpiData.orders, icon: ShoppingBag },
            { label: "Produits actifs", data: kpiData.activeProducts, icon: Package },
            { label: "Note moyenne", data: kpiData.averageRating, icon: Star },
          ].map((kpi, i) => (
            <Card key={i} className="p-6 bg-white border border-gray-200 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-[#4F46E5]/10">
                  <kpi.icon className="h-6 w-6 text-[#4F46E5]" />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {kpi.data.isPositive ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={kpi.data.isPositive ? 'text-green-600' : 'text-red-600'}>
                    {kpi.data.trend}
                  </span>
                </div>
              </div>
              <div className="text-3xl font-bold mb-1 text-[#0D1B3E]">
                {kpi.data.value}
                {kpi.label === "Note moyenne" && <Star className="inline h-5 w-5 ml-1 fill-yellow-400 text-yellow-400" />}
              </div>
              <div className="text-sm text-[#6F727B]">{kpi.label}</div>
            </Card>
          ))}
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-white border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-6 text-[#0D1B3E]">Top Produits</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate text-[#0D1B3E]">{product.name}</div>
                    <div className="text-xs text-[#6F727B]">{product.category}</div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                      {product.unitsSold} vendus
                    </Badge>
                    <div className="text-sm font-semibold mt-1 text-[#0D1B3E]">
                      {product.revenue.toLocaleString()} €
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-semibold text-[#0D1B3E]">Alertes stock critique</h2>
            </div>
            <div className="space-y-3">
              {criticalStockAlerts.map((alert, index) => (
                <div key={index} className="p-4 rounded-lg border border-red-200 bg-red-50">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-[#0D1B3E]">{alert.productName}</div>
                      <div className="text-xs mt-1 text-[#6F727B]">{alert.variant}</div>
                    </div>
                    <Badge className="bg-red-500 text-white hover:bg-red-500">
                      {alert.stock} restants
                    </Badge>
                  </div>
                  <Button size="sm" className="w-full bg-[#4F46E5] text-white hover:bg-[#4338ca]">
                    Réapprovisionner
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Table Section */}
        <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-[#0D1B3E]">Commandes récentes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['ID Commande', 'Client', 'Articles', 'Montant', 'Statut', 'Action'].map((head) => (
                    <th key={head} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#6F727B]">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#0D1B3E]">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0D1B3E]">{order.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6F727B]">{order.items}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#0D1B3E]">{order.amount.toFixed(2)} €</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="outline" size="sm" className="border-[#4F46E5] text-[#4F46E5] hover:bg-indigo-50">
                        Voir détails
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>

      <RoleSwitcher />
    </div>
  );
}