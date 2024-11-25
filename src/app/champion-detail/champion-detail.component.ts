import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';  // Para responsividade
import { MatDialog } from '@angular/material/dialog';  // Importando MatDialog

import { SkinModalComponent } from '../skin-modal/skin-modal.component';  // Importando o componente do modal

@Component({
  selector: 'app-champion-detail',
  templateUrl: './champion-detail.component.html',
  styleUrls: ['./champion-detail.component.scss']
})
export class ChampionDetailComponent implements OnInit {
  champion: any;
  skins: any[] = [];
  cols: number = 3;   // Valor padrão para 3 colunas

  constructor(
    private router: Router,
    private apiService: ApiService, 
    private route: ActivatedRoute, 
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog  // Injetando MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.getChampionDetails(id, token).subscribe(data => {
        this.champion = data;
        this.skins = data.skins || [];  // skins podem ser um array vazio se não houver skins
      });
    }

    // Responsividade para ajustar o número de colunas
    this.breakpointObserver.observe([
      Breakpoints.Handset, // Para telas pequenas
      Breakpoints.Tablet, // Para tablets
      Breakpoints.Web  // Para telas grandes
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.Handset]) {
          this.cols = 1; // 1 coluna para telas pequenas
        } else if (result.breakpoints[Breakpoints.Tablet]) {
          this.cols = 2; // 2 colunas para tablets
        } else {
          this.cols = 3; // 3 colunas para telas grandes
        }
      }
    });
  }

  onBack() {
    this.router.navigate(['/champions']);  // Aqui você pode redirecionar para a lista de campeões
  }

  // Método para abrir o modal com a imagem da skin
  openSkinModal(skin: any): void {
    this.dialog.open(SkinModalComponent, {
      data: {
        skinImage: skin.splash,
        skinName: skin.name
      }
    });
  }
}
