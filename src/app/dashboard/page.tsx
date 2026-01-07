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
  const [speciesFilter, setSpeciesFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    alive: 0,
    dead: 0,
    unknown: 0,
  });

  
  useEffect(() => {
    fetchCharacters();
  }, [currentPage]);

  
  useEffect(() => {
    if (characters.length === 0) return; 

    const filtered = filterCharacters(characters, search, statusFilter, speciesFilter);
    setFilteredCharacters(filtered);
  }, [search, statusFilter, speciesFilter, characters]);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      setError(null); 

      const data: ApiResponse = await getCharacters(currentPage);

      setCharacters(data.results);
      setFilteredCharacters(data.results);
      setTotalPages(data.info.pages);
      setHasNext(data.info.next !== null);
      setHasPrev(data.info.prev !== null);
      calculateStats(data.results);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error inesperado';
      setError(errorMessage);
      
      setCharacters([]);
      setFilteredCharacters([]);
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
    status: string,
    species: string
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

    if (species !== 'all') {
      filtered = filtered.filter(c => c.species === species);
    }

    return filtered;
  };

  const handlePrevPage = () => {
    if (hasPrev && !loading) { 
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (hasNext && !loading) { 
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

 
  if (loading && characters.length === 0) {
    return <LoadingState />;
  }

  
  if (error && characters.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <strong className="font-bold block mb-2">Error al cargar datos</strong>
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={() => fetchCharacters()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Intentar nuevamente
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader
        title="Dashboard de Personajes"
        subtitle="Rick and Morty"
      />

      {/* Estadísticas / Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total" value={stats.total} variant="default" />
        <StatsCard title="Alive" value={stats.alive} variant="success" />
        <StatsCard title="Dead" value={stats.dead} variant="danger" />
        <StatsCard title="Unknown" value={stats.unknown} variant="warning" />
      </div>

      {/* Filtros / Filters */}
      <FiltersPanel
        search={search}
        status={statusFilter}
        species={speciesFilter}
        onSearchChange={setSearch}
        onStatusChange={setStatusFilter}
        onSpeciesChange={setSpeciesFilter}
      />

      {/* Contador de resultados visibles / Visible results counter */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-gray-600 text-sm">
          Mostrando {filteredCharacters.length} personajes
        </span>
        
        {loading && (
          <span className="inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
        )}
      </div>

      {/* Characters grid with loading overlay / Grid de personajes con overlay de carga */}
      <div className="relative">
        {loading && characters.length > 0 && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-700 font-medium">Cargando / Loading página / page {currentPage}...</span>
              </div>
            </div>
          </div>
        )}

        {/* Lista de personajes / Character list*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCharacters.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>

      {/* Mensaje cuando no hay resultados / No results message */}
      {filteredCharacters.length === 0 && !loading && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mt-6 text-center">
          <p className="font-semibold mb-1">No se encontraron resultados</p>
          <p className="text-sm">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}

      {/* Controles de paginación / Pagination controls*/}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={!hasPrev || loading}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            hasPrev && !loading
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          ← Anterior
        </button>

        <span className="text-gray-700 font-medium px-4">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={!hasNext || loading}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            hasNext && !loading
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}