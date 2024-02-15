import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { DataListComponent } from './data-list/data-list.component';
import { AddDataComponent } from './add-data/add-data.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'main-page',
        component: MainPanelComponent,
        children: [
            {path: '', component: DataListComponent},
            {path: 'employees', component: DataListComponent},
            {path: 'tasks', component: DataListComponent},
            {path: 'teams', component: DataListComponent},
        ]
    },
    {
        path: 'add-data/:data-type',
        component: AddDataComponent
    },
    {
        path: 'edit-data/:data-type/:dataFrag',
        component: AddDataComponent
    },
    {
        path: 'details',
        component: DetailsComponent
    }
];
