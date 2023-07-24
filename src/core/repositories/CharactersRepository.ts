import axios from "axios";
import { CharactersPaginationDto } from "./CharactersPagination.dto";

export class CharactersRepository {
  async getCharacters(page: number): Promise<CharactersPaginationDto> {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    if (response.status === 200) {
      const data = (await response.data) as CharactersPaginationDto;
      return data;
    } else {
      throw new Error(response.statusText);
    }
  }
}
