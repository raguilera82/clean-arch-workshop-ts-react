import { Character } from '../../core/model/character.model';

interface CharacterCard {
    character: Character
}

export function CharacterCard(props: CharacterCard) {

    return (
        <div className="card">
            <img src={props.character.imageUrl} alt={props.character.fullName} />
            <h3>{props.character.fullName}</h3>
            <p>Status: {props.character.status}</p>
            <p>Spice: {props.character.spice}</p>
        </div>
    )

}