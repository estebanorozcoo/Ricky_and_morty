'use client';

import { useEffect, useState } from 'react';
import { getCharacters } from '@/services/api';
import { Character, ApiResponse } from '@/types/character';
import CharacterCard from '@/components/CharacterCard';
import StatsCard from '@/components/StatsCard';
import FiltersPanel from '@/components/FiltersPanel';
import LoadingState from '@/components/LoadingState';
import DashboardHeader from '@/components/DashboardHeader';

interface Stats {
  total: number;
  alive: number;
  dead: number;
  unknown: number;
}

export default function DashboardPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    alive: 0,
    dead: 0,
    unknown: 0,
  });

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const data: ApiResponse = await getCharacters();

      setCharacters(data.results);
      setFilteredCharacters(data.results);
      calculateStats(data.results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error inesperado';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (list: Character[]) => {
    const alive = list.filter(c => c.status === 'Alive').length;
    const dead = list.filter(c => c.status === 'Dead').length;
    const unknown = list.filter(c => c.status === 'unknown').length;

    setStats({
      total: list.length,
      alive,
      dead,
      unknown,
    });
  };

  const filterCharacters = (
    list: Character[],
    searchTerm: string,
    status: string
  ): Character[] => {
    let filtered = [...list];

    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (status !== 'all') {
      filtered = filtered.filter(c => c.status === status);
    }

    return filtered;
  };

  useEffect(() => {
    const filtered = filterCharacters(characters, search, statusFilter);
    setFilteredCharacters(filtered);
  }, [search, statusFilter, characters]);

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader
        title="Dashboard de Personajes"
        subtitle="Rick and Morty API"
      />

      {/* Estadísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total" value={stats.total} variant="default" />
        <StatsCard title="Alive" value={stats.alive} variant="success" />
        <StatsCard title="Dead" value={stats.dead} variant="danger" />
        <StatsCard title="Unknown" value={stats.unknown} variant="warning" />
      </div>

      {/* Filtros */}
      <FiltersPanel
        search={search}
        status={statusFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
      />

      {/* Contador de resultados visibles */}
      <div className="mb-4">
        <span className="text-gray-600 text-sm">
          Total visibles: {filteredCharacters.length}
        </span>
      </div>

      {/* Lista de personajes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCharacters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {/* Mensaje cuando no hay resultados */}
      {filteredCharacters.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mt-6">
          No se encontraron resultados.
        </div>
      )}
    </div>
  );
}