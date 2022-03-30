import { createAction, props } from '@ngrx/store';
import { PokemonUrl } from 'src/app/models/pokemon.model';
import { LazyResponse } from 'src/app/models/response.model';
import { PokemonState } from '../root-store.model';

export const paginationChangeAction = createAction(
  '[POKEMON] offset Change',
  props<Pick<PokemonState, 'offset' | 'limit' | 'count'>>()
);

export const loadPokemonSuccessAction = createAction(
  '[POKEMON] load Pokemon Success',
  props<LazyResponse<PokemonUrl>>()
);

export const loadPokemonDittoAction = createAction(
  '[POKEMON] load Pokemon Ditto'
);

export const loadPokemonDittoSuccessAction = createAction(
  '[POKEMON] load Pokemon Ditto Success',
  props<{ ditto: any }>()
);

export const loadPokemonDittoErrorAction = createAction(
  '[POKEMON] load Pokemon Ditto Error',
  props<{ error: any }>()
);
