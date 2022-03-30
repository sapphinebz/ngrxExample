import { Component, OnInit } from '@angular/core';
import { RootStore } from './store/root-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ngrxExample';
  constructor(public rootStore: RootStore) {}

  ngOnInit(): void {
    this.rootStore.onLoadPokemonDittoError$.subscribe((err) => {
      console.error('This is Error ', err);
    });
  }

  loadDitto() {
    this.rootStore.loadDitto();
  }
}
