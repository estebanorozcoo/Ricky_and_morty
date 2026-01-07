import React from "react";

// Avatar Component Props / Props del componente Avatar
export interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: number;
}

// Card Component Props / Props del componente Card
export interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
}



// DashboardHeader Component Props / Props del componente DashboardHeader
export interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

// FiltersPanel Component Props / Props del componente FiltersPanel
export interface FiltersPanelProps {
  search: string;
  status: string;
  species: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSpeciesChange: (value: string) => void;
}

// Sidebar Component Props / Props del componente Sidebar
export interface SidebarItem {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface SidebarProps {
  title?: string;
  items: SidebarItem[];
}

// StatsCard Component Props / Props del componente StatsCard
export interface StatsCardProps {
  title: string;
  value: number;
  variant?: 'success' | 'danger' | 'warning' | 'default';
}