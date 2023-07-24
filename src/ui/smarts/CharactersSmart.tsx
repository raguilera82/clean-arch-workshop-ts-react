import { useEffect, useState } from "react";
import { CharacterBloc, CharacterState } from "../../core/blocs/character.bloc";
import { CharacterCard } from "../dumbs/CharacterCard";

export function CharactersSmart() {

    const [characterState, setCharacterState] = useState<CharacterState>({
        characters: []
      })
    
      const characterBloc = CharacterBloc.getInstance();
    
      useEffect(() => {
        const handleCharacterState = (newState: CharacterState) => {
          setCharacterState(newState)
        }
    
        characterBloc.subscribe(handleCharacterState);
    
        const fetchData = async () => {
          await characterBloc.loadCharacters();
        }
    
        fetchData();
    
        return () => {
          characterBloc.unsubscribe(handleCharacterState);
        }
    
      }, [])
    
      return (
        <>
          <div>
            <ul>
              {characterState.characters.map(character => {
                return (
                  <CharacterCard character={character}></CharacterCard>
                )
              })}
            </ul>
          </div>
        </>
      )

}