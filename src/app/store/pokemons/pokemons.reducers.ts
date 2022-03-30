import { createReducer, on } from '@ngrx/store';
import { PokemonState } from '../root-store.model';
import {
  paginationChangeAction,
  loadPokemonSuccessAction,
  loadPokemonDittoSuccessAction,
  resetState,
} from './pokemons.actions';

const initState: PokemonState = {
  limit: 10,
  offset: 0,
  page: null,
  currentPage: null,
  count: 0,
  pokemons: [],
  ditto: null,
};

export const pokemonsReducer = createReducer<PokemonState>(
  initState,
  on(resetState, (_, __) => {
    return { ...initState };
  }),
  on(loadPokemonDittoSuccessAction, (state, action) => {
    return { ...state, ditto: action.ditto };
  }),
  on(paginationChangeAction, (state, action) => {
    const count = action.count;
    const limit = action.limit;
    const offset = action.offset;
    let page = null;
    let currentPage = null;
    if (count > 0) {
      page = Math.ceil(count / limit);
      currentPage = Math.ceil((offset + limit) / limit);
    }
    return { ...state, count, limit, offset, page, currentPage };
  }),
  on(loadPokemonSuccessAction, (state, action) => {
    return { ...state, count: action.count, pokemons: action.results };
  })
);
