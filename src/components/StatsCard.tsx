import { StatsCardProps } from '@/types/components';


export default function StatsCard({
  title,
  value,
  variant = 'default',
}: StatsCardProps) {
  const colorMap = {
    success: 'text-success',
    danger: 'text-danger',
    warning: 'text-warning',
    default: 'text-dark',
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 text-center p-3 shadow-sm">
      <h6 className="text-sm font-semibold text-gray-700 mb-2">{title}</h6>
      <p className={`text-2xl font-bold ${colorMap[variant]}`}>
        {value}
      </p>
    </div>
  );
}
