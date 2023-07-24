import { Character } from "../model/character.model";
import { BaseBloc } from "./base";
import {
  LoadCharactersOutput,
  LoadCharactersUseCase,
} from "../usecases/load-characters.usecase";

export type CharacterState = {
  characters: Character[];
  page: number;
  lastPage: number;
  error: string | null;
};

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
    this.setState({ page: this.state.page || 1 });
  }

  async loadCharacters(): Promise<void> {
    try {
      const loadCharacterOutput: LoadCharactersOutput =
        await LoadCharactersUseCase.run(this.state.page);
      this.setState({
        characters: loadCharacterOutput.characters,
        lastPage: loadCharacterOutput.lastPage,
      });
    } catch (error) {
      this.setState({ error: "Error ocurred" });
    }
  }

  async nextPage(): Promise<void> {
    this.setState({ page: this.state.page + 1 });
    await this.loadCharacters();
  }

  async previousPage(): Promise<void> {
    this.setState({ page: this.state.page - 1 });
    await this.loadCharacters();
  }
}
