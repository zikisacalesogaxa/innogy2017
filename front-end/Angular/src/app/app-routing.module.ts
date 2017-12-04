import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlumbersComponent } from './plumbers/plumbers.component';
import { HirePlumberComponent } from './hire-plumber/hire-plumber.component';
import { RegisterPlumberComponent } from './register-plumber/register-plumber.component';
import { PlumberSchedulesComponent } from './plumber-schedules/plumber-schedules.component';

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'plumbers', component: PlumbersComponent },
    { path: 'register', component: RegisterPlumberComponent },
    { path: 'plumbers/:_id', component: PlumbersComponent },
    { path: 'book/:_id', component: HirePlumberComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
