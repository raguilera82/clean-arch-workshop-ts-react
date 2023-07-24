import { afterEach, describe, expect, it, vi } from 'vitest';
import { CharacterBloc } from '../../../src/core/blocs/character.bloc';
import characterResponse from '../../fixtures/characters.json';
import axios from 'axios';

vi.mock('axios');

describe('Characters bloc', () => {

    it('should load characters', async () => {

        vi.mocked(axios, true).get.mockResolvedValueOnce(characterResponse);

        const characterBloc = CharacterBloc.getInstance();

        await characterBloc.loadCharacters();

        const currentState = characterBloc.getState();
        expect(currentState.characters.length).toBeGreaterThan(0);

    })

    afterEach(() => {
        vi.clearAllMocks();
    })

})