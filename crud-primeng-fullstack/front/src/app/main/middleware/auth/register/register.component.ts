import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    email = '';
    password = '';

    constructor(
        private authService: AuthService,
        public router: Router
    ) { }

    register() {
        const user = {
            username: this.email,  // <-- O BACK-END USA "username"
            password: this.password
        };

        console.log("Enviando para API:", user);


        this.authService.register(user).subscribe({
            next: () => {
                alert('Conta criada com sucesso!');
                this.router.navigate(['/auth/login']);
            },
            error: () => {
                alert('Erro ao criar conta.');
            }
        });
    }

}
