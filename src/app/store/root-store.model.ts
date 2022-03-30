import { PokemonUrl } from '../models/pokemon.model';

export interface AppState {
  pokemon: PokemonState;
}

export interface PokemonState {
  limit: number;
  offset: number;
  count: number;
  currentPage: null | number;
  page: null | number;
  pokemons: PokemonUrl[];
  ditto: any;
}
