import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; 
import { getCharacterById } from '@/services/api';
import { Character } from '@/types/character';

interface CharacterDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CharacterDetailPage({ 
  params 
}: CharacterDetailPageProps) {
  const { id } = await params;
  let character: Character;

  try {
    character = await getCharacterById(Number(id));
  } catch (error) {
    notFound();
  }

  const getStatusColor = (status: Character['status']) => {
    switch (status) {
      case 'Alive':
        return 'bg-green-100 text-green-800';
      case 'Dead':
        return 'bg-red-100 text-red-800';
      case 'unknown':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Botón volver atrás / Back button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Volver atrás 
        </Link>

        {/* Card principal del personaje / Main character card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header con imagen y nombre / Header with image and name */}
          <div className="md:flex">
            {/* Imagen del personaje / Character image */}
            <div className="md:w-1/3 relative h-80 md:h-auto"> 
              <Image
                src={character.image}
                alt={character.name}
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority 
              />
            </div>

            {/* Información principal / Main information */}
            <div className="p-6 md:w-2/3">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {character.name}
              </h1>

              {/* Badge de estado / Status badge */}
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${getStatusColor(
                  character.status
                )}`}
              >
                {character.status}
              </span>

              {/* Grid de información / Information grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Especie / Species */}
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Especie 
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {character.species}
                  </p>
                </div>

                {/* Género / Gender */}
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Género 
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {character.gender}
                  </p>
                </div>

                {/* Tipo / Type */}
                {character.type && (
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                      Tipo 
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {character.type}
                    </p>
                  </div>
                )}

                {/* Origen / Origin */}
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Origen 
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {character.origin.name}
                  </p>
                </div>

                {/* Ubicación / Location */}
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Última ubicación conocida 
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {character.location.name}
                  </p>
                </div>

                {/* Número de episodios / Episode count */}
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Episodios 
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {character.episode.length} episodios 
                  </p>
                </div>
              </div>

              {/* Fecha de creación / Creation date */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Creado el: {new Date(character.created).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}