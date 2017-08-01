import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../controllers/register.component';
import { LoginComponent } from '../controllers/login.component';
import { HomeComponent } from '../controllers/home.component';
import { ReceivedComponent } from '../controllers/invoices/received.component';
import { GeneratedComponent } from '../controllers/invoices/generated.component';
import { AuthGuard } from '../config/auth.guard';

const routes: Routes = [
     {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
     {path: 'invoices/received', component: ReceivedComponent, canActivate: [AuthGuard]},
     {path: 'invoices/generated', component: GeneratedComponent, canActivate: [AuthGuard]},
     {path: 'register' , component: RegisterComponent},
     {path: 'login' , component: LoginComponent},
     // otherwise redirect to home
     {path: '**', redirectTo: 'home'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule {}

export const routingComponents = [RegisterComponent]