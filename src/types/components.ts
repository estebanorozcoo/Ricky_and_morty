import React from "react";

// Avatar Component Props
export interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: number;
}

// Card Component Props
export interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  onClick?: () => void;
}



// DashboardHeader Component Props
export interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

// FiltersPanel Component Props
export interface FiltersPanelProps {
  search: string;
  status: string;
  species: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSpeciesChange: (value: string) => void;
}

// Sidebar Component Props
export interface SidebarItem {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
}

export interface SidebarProps {
  title?: string;
  items: SidebarItem[];
}

// StatsCard Component Props
export interface StatsCardProps {
  title: string;
  value: number;
  variant?: 'success' | 'danger' | 'warning' | 'default';
}