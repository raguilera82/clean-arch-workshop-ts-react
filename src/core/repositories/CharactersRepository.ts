import axios from "axios";
import { Character } from '../model/character.model';
import { CharactersPaginationDto } from "./CharactersPagination.dto";

export class CharactersRepository {

    async getCharacters(): Promise<Character[]> {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=1`);
        if (response.status === 200) {
            const data = await response.data as CharactersPaginationDto;
            return data.results.map(result => {
                return {
                    fullName: result.name,
                    imageUrl: result.image,
                    spice: result.species,
                    status: result.status
                }
            })
        }else {
            throw new Error(response.statusText);
        }

    }

}