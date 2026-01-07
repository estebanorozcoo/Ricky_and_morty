import { Character } from '@/types/character'


export function isAlive(status: Character['status']): boolean {
  return status === 'Alive'
}

export function getStatusColor(status: Character['status']): string {
  const colors: Record<Character['status'], string> = {
    Alive: 'text-green-600 bg-green-100',
    Dead: 'text-red-600 bg-red-100',
    unknown: 'text-gray-600 bg-gray-100'
  }
  
  return colors[status] || colors.unknown
}


export function getGenderColor(gender: Character['gender']): string {
  const colors: Record<Character['gender'], string> = {
    Male: 'text-blue-600 bg-blue-100',
    Female: 'text-pink-600 bg-pink-100',
    Genderless: 'text-purple-600 bg-purple-100',
    unknown: 'text-gray-600 bg-gray-100'
  }
  
  return colors[gender] || colors.unknown
}


export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  
  if (isNaN(date.getTime())) {
    return 'Fecha inválida'
  }
  
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}


export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}


export function capitalize(text: string): string {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}


export function formatSpecies(species: Character['species']): string {
  return species === 'unknown' ? 'Desconocida' : capitalize(species)
}


export function translateStatus(status: Character['status']): string {
  const translations: Record<Character['status'], string> = {
    Alive: 'Vivo',
    Dead: 'Muerto',
    unknown: 'Desconocido'
  }
  
  return translations[status] || status
}


export function translateGender(gender: Character['gender']): string {
  const translations: Record<Character['gender'], string> = {
    Male: 'Masculino',
    Female: 'Femenino',
    Genderless: 'Sin género',
    unknown: 'Desconocido'
  }
  
  return translations[gender] || gender
}