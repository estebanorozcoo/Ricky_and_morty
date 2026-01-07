import { FiltersPanelProps } from '@/types/components';

export default function FiltersPanel({
  search,
  status,
  species,
  onSearchChange,
  onStatusChange,
  onSpeciesChange,
}: FiltersPanelProps) {
  return (
    <div className="mb-4 p-3 bg-gray-100 rounded">
  <div className="flex gap-3 flex-wrap items-center">
    <div className="flex-1 min-w-[200px]">
      <input
        type="text"
        className="w-full px-3 py-2 border rounded"
        placeholder="Buscar personaje..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>

    <div className="flex-1 min-w-[150px]">
      <select
        className="w-full px-3 py-2 border rounded"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="all">Todos los estados</option>
        <option value="Alive">Vivo</option>
        <option value="Dead">Muerto</option>
        <option value="unknown">Desconocido</option>
      </select>
    </div>

    <div className="flex-1 min-w-[150px]">
      <select
        className="w-full px-3 py-2 border rounded"
        value={species}
        onChange={(e) => onSpeciesChange(e.target.value)}
      >
        <option value="all">Todas las especies</option>
        <option value="Human">Humano</option>
        <option value="Alien">Alien</option>
      </select>
    </div>
  </div>
</div>
  );
}