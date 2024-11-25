import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChampionsListComponent } from './champions-list/champions-list.component';
import { ChampionDetailComponent } from './champion-detail/champion-detail.component';
import { AuthGuard } from './auth.guard';  // Importando o AuthGuard

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'champions',
    component: ChampionsListComponent,
    canActivate: [AuthGuard]  // Usando o AuthGuard
  },
  {
    path: 'champions/:id',
    component: ChampionDetailComponent,
    canActivate: [AuthGuard]  // Usando o AuthGuard
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
