import { ApiResponse, Character } from '../types/character';

const BASE_URL = 'https://rickandmortyapi.com/api';

/**
 * 
 * @param page 
 * @returns 
 * @throws 
 */
export async function getCharacters(page?: number): Promise<ApiResponse> {
  try {
    const url = page ? `${BASE_URL}/character?page=${page}` : `${BASE_URL}/character`;
    const response = await fetch(url);
    
    if (!response.ok) {
      // Error HTTP / HTTP Error
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
 * 
 * @param id 
 * @returns 
 * @throws 
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