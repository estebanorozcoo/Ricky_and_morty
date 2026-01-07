import Link from 'next/link';
import { Character } from '@/types/character';
import Image from 'next/image';


interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  // Determinar el color del badge según el status
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
    <Link href={`/character/${character.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
        {/* Imagen del personaje / Character image */}
      <div className="relative w-full h-48">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
        {/* Contenido de la card / Card content */}
        <div className="p-4">
          {/* Nombre del personaje / Character name */}
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {character.name}
          </h2>
          
          {/* Badge de estado / State badge*/}
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 ${getStatusColor(
              character.status
            )}`}
          >
            {character.status}
          </span>
          
          {/* Especie / Species */}
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Especie:</span> {character.species}
          </p>
        </div>
      </div>
    </Link>
  );
}