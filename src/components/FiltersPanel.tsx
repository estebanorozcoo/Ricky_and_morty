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
    <div className="p-3 bg-light rounded mb-4">
      <div className="row g-2">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar personaje..."
            value={search}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={status}
            onChange={e => onStatusChange(e.target.value)}
          >
            <option value="all">Todos los estados</option>
            <option value="Alive">Vivo</option>
            <option value="Dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={species}
            onChange={e => onSpeciesChange(e.target.value)}
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