import { createSelector, Selector } from '@ngrx/store';
import { AppState, PokemonState } from '../root-store.model';

export const pokemonStateSelector: Selector<AppState, PokemonState> = (state) =>
  state.pokemon;

export const limitSelector = createSelector(
  pokemonStateSelector,
  (pokemon) => pokemon.limit
);

export const offsetSelector = createSelector(
  pokemonStateSelector,
  (pokemon) => pokemon.offset
);

export const countSelector = createSelector(
  pokemonStateSelector,
  (pokemon) => pokemon.count
);

export const pokemonsSelector = createSelector(
  pokemonStateSelector,
  (pokemon) => pokemon.pokemons
);

export const pageSelector = createSelector(
  pokemonStateSelector,
  (pokemon) => pokemon.page
);

export const currentPageSelector = createSelector(
  pokemonStateSelector,
  (pokemon) => pokemon.currentPage
);

export const dittoSelector = createSelector(
  pokemonStateSelector,
  (pokemon) => pokemon.ditto
);
