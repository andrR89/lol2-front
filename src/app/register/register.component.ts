import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+( [A-Za-z]+)*$/)]],
    birthDate: ['', Validators.required],
    username: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required, 
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)  // Regex para senha
    ]]
  });

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onRegister() {
    if (this.registerForm.valid) {
      const { name, birthDate, username, password } = this.registerForm.value;
      this.apiService.register(name!, birthDate!, username!, password!).subscribe(
        () => {
          this.snackBar.open('Cadastro realizado com sucesso!', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbar-success']
          });

          this.router.navigate(['/login']);
        },
        error => {
          this.snackBar.open('Erro ao cadastrar! Tente novamente.', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbar-error']
          });
        }
      );
    } else {
      // Caso o formulário não seja válido, você pode exibir um erro de validação personalizada
      this.snackBar.open('Por favor, verifique os campos e tente novamente.', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['snackbar-error']
      });
    }
  }
}
