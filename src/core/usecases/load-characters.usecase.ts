import { Character } from "../model/character.model";
import { CharactersRepository } from "../repositories/CharactersRepository";

export class LoadCharactersUseCase {

    static async run(): Promise<Character[]> {
       const characterRepository = new CharactersRepository();
       return characterRepository.getCharacters();
    }

}