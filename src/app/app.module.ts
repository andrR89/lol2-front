import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; // Importe o MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; 
import { MatTableModule } from '@angular/material/table';      // Para mat-header-cell, mat-cell, mat-header-row, mat-row
import { MatPaginatorModule } from '@angular/material/paginator';  // Para mat-paginator
import { MatCardModule } from '@angular/material/card';   

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChampionsListComponent } from './champions-list/champions-list.component';
import { ChampionDetailComponent } from './champion-detail/champion-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { SkinModalComponent } from './skin-modal/skin-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon'; 
import { MatToolbarModule } from '@angular/material/toolbar';  // Importe o MatToolbarModule
import { MatPaginatorIntl } from '@angular/material/paginator';


export function getPtBrPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Itens por página:';
  paginatorIntl.nextPageLabel = 'Próxima página';
  paginatorIntl.previousPageLabel = 'Página anterior';
  paginatorIntl.firstPageLabel = 'Primeira página';
  paginatorIntl.lastPageLabel = 'Última página';
  paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, length);
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };

  return paginatorIntl;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChampionsListComponent,
    ChampionDetailComponent,
    SkinModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl() },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
