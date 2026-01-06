'use client'
import { getCharacters } from "@/services/api"
import CharacterCard from "@/components/CharacterCard"
import LoadingState from "@/components/LoadingState"
import { Character } from "@/types/character"
import { useEffect, useState } from "react"

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hasNext, setHasNext] = useState(false)
  const [hasPrev, setHasPrev] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    
    getCharacters(currentPage)
      .then(data => {
        setCharacters(data.results)
        setTotalPages(data.info.pages)
        setHasNext(data.info.next !== null)
        setHasPrev(data.info.prev !== null)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message || 'Error al cargar los personajes')
        setLoading(false)
      })
  }, [currentPage])

  const handlePrevPage = () => {
    if (hasPrev) {
      setCurrentPage(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNextPage = () => {
    if (hasNext) {
      setCurrentPage(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (loading) return <LoadingState />
  
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <p className="text-red-600 text-lg font-semibold mb-2">Error</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Personajes de Rick and Morty
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
          />
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={!hasPrev}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            hasPrev
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
          disabled={!hasNext}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            hasNext
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Siguiente →
        </button>
      </div>
    </div>
  )
}