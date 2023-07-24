import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { CharacterBloc } from "../../../src/core/blocs/character.bloc";
import characterPage1 from "../../fixtures/characters-page-1.json";
import characterPage2 from "../../fixtures/characters-page-2.json";
import characterError500 from "../../fixtures/characters-error-500.json";
import axios from "axios";

vi.mock("axios");

describe("Characters bloc", () => {
  let characterBloc: CharacterBloc;

  beforeAll(() => {
    characterBloc = CharacterBloc.getInstance();
  });

  it("should load characters", async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce(characterPage1);

    await characterBloc.loadCharacters();

    expect(characterBloc.getState().characters.length).toBe(20);

    expect(characterBloc.getState().characters[0].fullName).toEqual(
      "Rick Sanchez"
    );
  });

  it("should show pagination characters", async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce(characterPage2);

    await characterBloc.nextPage();

    expect(characterBloc.getState().page).toBe(2);
    expect(characterBloc.getState().characters.length).toBe(20);
    expect(characterBloc.getState().characters[0].fullName).toEqual(
      "Aqua Morty"
    );

    vi.clearAllMocks();
    vi.mocked(axios, true).get.mockResolvedValueOnce(characterPage1);

    await characterBloc.previousPage();

    expect(characterBloc.getState().page).toBe(1);
    expect(characterBloc.getState().characters.length).toBe(20);
    expect(characterBloc.getState().characters[0].fullName).toEqual(
      "Rick Sanchez"
    );
  });

  it("should handle error", async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce(characterError500);

    await characterBloc.loadCharacters();

    expect(characterBloc.getState().error).toEqual("Error ocurred");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
