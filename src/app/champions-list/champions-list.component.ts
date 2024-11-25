import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-champions-list',
  templateUrl: './champions-list.component.html',
  styleUrls: ['./champions-list.component.scss']
})
export class ChampionsListComponent implements OnInit {

  displayedColumns: string[] = ['icon', 'name', 'title', 'actions'];
  allChampions: any[] = []; // Armazenar todos os campeões
  dataSource = new MatTableDataSource<any>([]); // Fonte de dados da tabela
  filter: string = '';
  pageSize = 10;
  pageIndex = 0;
  totalRecords = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.apiService.getChampions(token).subscribe((data: any) => {
        this.allChampions = data; // Armazenar todos os campeões
        this.applyPagination(); // Aplica a paginação e filtro inicial
      });
    }
  }

  // Método de pesquisa
  onSearch() {
    this.pageIndex = 0; // Resetar para a primeira página ao buscar
    this.applyPagination(); // Aplica o filtro e paginação
  }

  // Método para redirecionar para os detalhes do campeão
  onSelectChampion(id: string) {
    this.router.navigate(['/champions', id]);
  }

  // Método de logout
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);  // Redireciona para a página de login
  }

  // Método para tratar a mudança de página
  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.applyPagination(); // Aplica a paginação e filtro na mudança de página
  }

  // Aplica a paginação e filtro corretamente
  applyPagination() {
    const filteredData = this.getFilteredData(); // Aplica o filtro nos dados
    this.totalRecords = filteredData.length; // Atualiza o total de registros
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.dataSource.data = filteredData.slice(startIndex, endIndex); // Aplica a paginação nos dados filtrados
  }

  // Retorna os dados filtrados com base no filtro de pesquisa
  getFilteredData() {
    return this.allChampions.filter((item: any) => {
      return item.name.toLowerCase().includes(this.filter.toLowerCase());
    });
  }
}
