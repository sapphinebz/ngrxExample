import { PokemonUrl } from '../models/pokemon.model';

export interface AppState {
  pokemon: PokemonState;
  member?: MemberState;
  dashboard?: DashboardState;
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

export interface DashboardState {
  dashboardXX: string;
}

export interface MemberState {
  memberName: string;
  memberId: number;
}
