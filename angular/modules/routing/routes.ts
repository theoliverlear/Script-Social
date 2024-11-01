import {Route, Routes} from "@angular/router";
import {HomeComponent} from "../../components/pages/home/home.component";
import {
    AuthorizeComponent
} from "../../components/pages/authorize/authorize.component";
import {
    ProfileComponent
} from "../../components/pages/profile/profile.component";
import {
    MessagesComponent
} from "../../components/pages/messages/messages.component";

export const homeRoute: Route = {
    path: '',
    component: HomeComponent,
    data: {
        meta: {
            title: 'Home | Script Social'
        },
    }
}
export const authorizeRoute: Route = {
    path: 'authorize',
    component: AuthorizeComponent,
    data: {
        meta: {
            title: 'Authorize | Script Social'
        }
    }
}
export const profileRoute: Route = {
    path: 'profile',
    component: ProfileComponent,
    data: {
        meta: {
            title: 'Profile | Script Social',
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
export const messagesRoute: Route = {
    path: 'messages',
    component: MessagesComponent,
    data: {
        meta: {
            title: 'Messages | Script Social'
        }
    }
}
export const routes: Routes = [
    homeRoute,
    authorizeRoute,
    profileRoute,
    messagesRoute
];