import { ApiResponse, Character } from '../types/character';

const BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * Obtiene la lista de personajes desde la API de Rick and Morty
 * @param page - Número de página a obtener (opcional, por defecto 1)
 * @returns Promise con la respuesta de la API incluyendo info de paginación y personajes
 * @throws Error si la petición falla
 */
export async function getCharacters(page?: number): Promise<ApiResponse> {
  try {
    const url = page ? `${BASE_URL}/character?page=${page}` : `${BASE_URL}/character`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
    
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener personajes: ${error.message}`);
    }
    throw new Error('Error desconocido al obtener personajes');
  }
}

/**
 * Obtiene un personaje específico por su ID
 * @param id - ID del personaje a obtener
 * @returns Promise con los datos del personaje
 * @throws Error si la petición falla o el personaje no existe
 */
export async function getCharacterById(id: number): Promise<Character> {
  try {
    const response = await fetch(`${BASE_URL}/character/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Personaje con ID ${id} no encontrado`);
      }
      throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
    }
    
    const data: Character = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener personaje: ${error.message}`);
    }
    throw new Error('Error desconocido al obtener personaje');
  }
}