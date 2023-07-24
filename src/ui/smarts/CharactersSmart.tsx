import { useEffect, useState } from "react";
import { CharacterBloc, CharacterState } from "../../core/blocs/character.bloc";
import { CharacterCard } from "../dumbs/CharacterCard";

export function CharactersSmart() {
  const [characterState, setCharacterState] = useState<CharacterState>({
    characters: [],
    page: 1,
    error: null,
    lastPage: 0,
  });

  const characterBloc = CharacterBloc.getInstance();

  useEffect(() => {
    const handleCharacterState = (newState: CharacterState) => {
      setCharacterState(newState);
    };

    characterBloc.subscribe(handleCharacterState);

    const fetchData = async () => {
      await characterBloc.loadCharacters();
    };

    fetchData();

    return () => {
      characterBloc.unsubscribe(handleCharacterState);
    };
  }, []);

  const handleNextPage = () => {
    characterBloc.nextPage();
  };

  const handlePreviousPage = () => {
    characterBloc.previousPage();
  };

  return (
    <>
      <div>
        <button
          onClick={handlePreviousPage}
          disabled={characterState.page === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={characterState.page === characterState.lastPage}
        >
          Next
        </button>
      </div>
      <div>
        {characterState.error ? (
          <p>Error: {characterState.error}</p>
        ) : (
          <ul>
            {characterState.characters.map((character) => {
              return (
                <CharacterCard
                  key={character.characterId}
                  character={character}
                ></CharacterCard>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
