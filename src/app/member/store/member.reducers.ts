import { createReducer } from '@ngrx/store';
import { MemberState } from 'src/app/store/root-store.model';

const initState: MemberState = {
  memberId: 0,
  memberName: '',
};
export const memberReducer = createReducer<MemberState>(initState);
