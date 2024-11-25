import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';  // Importando o MatSnackBar

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService, 
    private router: Router,
    private snackBar: MatSnackBar  // Adicionando o MatSnackBar ao construtor
  ) {}
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/champions']); // Redireciona se já estiver autenticado
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.apiService.login(username!, password!).subscribe(
        (data: any) => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/champions']);
        },
        error => {
          // Substituindo o alert por um Snackbar
          this.snackBar.open('Login falhou! Verifique suas credenciais.', 'Fechar', {
            duration: 3000,  // O Snackbar ficará visível por 3 segundos
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      );
    }
  }
}
