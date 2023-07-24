import { Character } from "../model/character.model";
import { BaseBloc } from "./base";
import { LoadCharactersUseCase } from '../usecases/load-characters.usecase';

export type CharacterState = {
    characters: Character[]
}

export class CharacterBloc extends BaseBloc<CharacterState> {

    private static instance: CharacterBloc;

    public static getInstance(): CharacterBloc {
        if (!CharacterBloc.instance) {
            CharacterBloc.instance = new CharacterBloc();
        }
        return CharacterBloc.instance as CharacterBloc;
      }
    
      private constructor() {
        super("characters_state");
        this.setState({ characters: [] });
      }

      async loadCharacters(): Promise<void> {
        const characters: Character[] = await LoadCharactersUseCase.run();
        this.setState({characters})
      }

}