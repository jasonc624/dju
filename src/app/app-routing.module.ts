import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RequestSongComponent } from './request-song/request-song.component';
import { RequestedSongsComponent } from './requested-songs/requested-songs.component';

const routes: Routes = [
  { path: 'request', component: RequestSongComponent },
  {
    path: 'dj',
    component: RequestedSongsComponent,
  },
  { path: 'session/:id', component: RequestedSongsComponent },
  { path: 'session/request/:id', component: RequestSongComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
