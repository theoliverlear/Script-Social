import {Route, Routes} from "@angular/router";
import {HomeComponent} from "../../components/pages/home/home.component";
import {
    AuthorizeComponent
} from "../../components/pages/authorize/authorize.component";
import {
    ProfileComponent
} from "../../components/pages/profile/profile.component";

export const homeRoute: Route = {
    path: '',
    component: HomeComponent,
    data: {
        meta: {title: 'Home | Script Social',
            stylesheets: []},

    }
}
export const authorizeRoute: Route = {
    path: 'authorize',
    component: AuthorizeComponent,
    data: {
        meta: {title: 'Authorize | Script Social',
            stylesheets: []}
    }
}
export const profileRoute: Route = {
    path: 'profile',
    component: ProfileComponent,
    data: {
        meta: {
            title: 'Profile | Script Social',
            stylesheets: []
        }
    }
}
export const profileWithIdRoute: Route = {
    //     path: 'profile/:id',
    //     component: ProfileComponent,
    //     data: {
    //         meta: {
    //             title: 'Profile | Script Social',
    //             stylesheets: []
    //         }
    //     }
}
export const routes: Routes = [
    homeRoute,
    authorizeRoute,
    profileRoute
];