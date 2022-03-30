import { createReducer } from '@ngrx/store';
import { DashboardState } from 'src/app/store/root-store.model';

const initState: DashboardState = {
  dashboardXX: '',
};
export const dashboardReducer = createReducer(initState);
