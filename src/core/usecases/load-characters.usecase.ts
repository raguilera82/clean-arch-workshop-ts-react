import { Character } from "../model/character.model";
import { CharactersRepository } from "../repositories/CharactersRepository";

export type LoadCharacterInput = {
  page: number;
};

export type LoadCharactersOutput = {
  characters: Character[];
  lastPage: number;
};

export class LoadCharactersUseCase {
  static async run(page: number): Promise<LoadCharactersOutput> {
    const characterRepository = new CharactersRepository();
    const data = await characterRepository.getCharacters(page);

    const characters = data.results.map((result) => {
      return {
        characterId: result.id,
        fullName: result.name,
        imageUrl: result.image,
        spice: result.species,
        status: result.status,
      };
    });
    return {
      characters,
      lastPage: data.info.pages,
    };
  }
}
