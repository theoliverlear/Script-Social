import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "../components/pages/home/home.component";
import {
    AuthorizeComponent
} from "../components/pages/authorize/authorize.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {
            meta: {title: 'Home | Script Social',
                   stylesheets: []},

        }
    },
    {
        path: 'authorize',
        component: AuthorizeComponent,
        data: {
            meta: {title: 'Authorize | Script Social',
                   stylesheets: []}
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouting { }