import { Routes } from '@angular/router';
import { storageResolver } from './services/storage/storage.service';
import { AppGuard } from './app-guard.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'weather',
    pathMatch: 'full',
  },
  {
    path: 'weather',
    canActivate: [AppGuard],
    loadComponent: () =>
      import('./weather/weather.page').then((m) => m.WeatherPage),
    resolve: { storage: storageResolver },
  },
  {
    path: 'favorites',
    canActivate: [AppGuard],
    loadComponent: () => import('./favorite/favorite.page').then(m => m.FavoritePage),
    resolve: { storage: storageResolver },
  },
  {
    path: 'history',
    canActivate: [AppGuard],
    loadComponent: () => import('./history/history.page').then( m => m.HistoryPage),
    resolve: { storage: storageResolver },
  },
];
