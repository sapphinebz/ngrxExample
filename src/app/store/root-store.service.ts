import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionsSubject, Store } from '@ngrx/store';
import {
  catchError,
  combineLatest,
  debounceTime,
  defer,
  EMPTY,
  Observable,
  race,
  Subject,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { PokemonUrl } from '../models/pokemon.model';
import { LazyResponse } from '../models/response.model';
import * as PokemonAction from './pokemons/pokemons.actions';
import {
  countSelector,
  currentPageSelector,
  dittoSelector,
  limitSelector,
  offsetSelector,
  pageSelector,
  pokemonsSelector,
} from './pokemons/pokemons.selectors';
import { ofType } from './root-store.fn';
import { AppState } from './root-store.model';

@Injectable({
  providedIn: 'root',
})
export class RootStore {
  limit$ = this.store.select(limitSelector);
  offset$ = this.store.select(offsetSelector);
  count$ = defer(() => {
    console.log('subscribe!');
    return this.store.select(countSelector);
  });
  pokemons$ = this.store.select(pokemonsSelector);
  page$ = this.store.select(pageSelector);
  currentPage$ = this.store.select(currentPageSelector);

  ditto$ = this.store.select(dittoSelector);

  onLoadPokemonDittoError$ = this.actions$.pipe(
    ofType(PokemonAction.loadPokemonDittoErrorAction)
  );

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private actions$: ActionsSubject
  ) {
    this.effectLoadPokemon();
    this.effectLoadPokemonDitto();
  }

  resetPokemonState() {
    this.store.dispatch(PokemonAction.resetState());
  }

  private effectLoadPokemonDitto() {
    this.actions$
      .pipe(
        ofType(PokemonAction.loadPokemonDittoAction),
        switchMap(() => {
          return this.http.get('https://pokeapi.co/api/v2/pokemon/ditto').pipe(
            catchError((err) => {
              this.store.dispatch(
                PokemonAction.loadPokemonDittoErrorAction({ error: err })
              );
              return EMPTY;
            })
          );
        })
      )
      .subscribe((response) => {
        this.store.dispatch(
          PokemonAction.loadPokemonDittoSuccessAction({ ditto: response })
        );
      });
  }

  private effectLoadPokemon() {
    return combineLatest([this.limit$, this.offset$])
      .pipe(
        debounceTime(0),
        switchMap(([limit, offset]) =>
          this.http
            .get<LazyResponse<PokemonUrl>>(
              ` https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
            )
            .pipe(
              catchError((err) => {
                // this.onLoadPokemonError.next(err);
                return EMPTY;
              }),
              tap((response) => {
                this.store.dispatch(
                  PokemonAction.loadPokemonSuccessAction(response)
                );
                this.store.dispatch(
                  PokemonAction.paginationChangeAction({
                    limit,
                    offset,
                    count: response.count,
                  })
                );
              })
            )
        )
      )
      .subscribe();
  }

  loadDitto() {
    this.store.dispatch(PokemonAction.loadPokemonDittoAction());

    // return new Observable((observer) => {
    //   const successAction$ = this.actions$.pipe(
    //     ofType(PokemonAction.loadPokemonDittoSuccessAction),
    //     tap((response) => {
    //       observer.next(response);
    //       observer.complete();
    //     })
    //   );

    //   const errorAction$ = this.actions$.pipe(
    //     ofType(PokemonAction.loadPokemonDittoErrorAction),
    //     tap((err) => {
    //       observer.error(err);
    //     })
    //   );

    //   this.store.dispatch(PokemonAction.loadPokemonDittoAction());

    //   const subscription = race(successAction$, errorAction$).subscribe();
    //   return () => subscription.unsubscribe();
    // });

    // return this.http.get('https://pokeapi.co/api/v2/pokemon/ditto').pipe(
    //   tap({
    //     next: (response) => {
    //       this.store.dispatch(
    //         PokemonAction.loadPokemonDittoSuccessAction({ ditto: response })
    //       );
    //     },
    //     error: (err) => {
    //       // this.store.dispatch(loadDittoError())
    //     },
    //   })
    // );
  }
}
