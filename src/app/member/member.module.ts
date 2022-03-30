import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { StoreModule } from '@ngrx/store';
import { MemberState } from '../store/root-store.model';
import { memberReducer } from './store/member.reducers';

@NgModule({
  declarations: [MemberComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    StoreModule.forFeature<MemberState>('member', memberReducer),
  ],
})
export class MemberModule {}
