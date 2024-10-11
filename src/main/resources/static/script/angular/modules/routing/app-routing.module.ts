import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {routes} from "./routes";
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRouting {
    constructor() {
        console.log('AppRouting loaded');
    }
}