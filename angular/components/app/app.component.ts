import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map, mergeMap} from "rxjs";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    inputs: ['name'],
    styleUrls: ['./app-style.component.css']
})
export class AppComponent implements OnInit {
    title: string;
    stylesheets: string[];
    @Input() name: string = '';
    constructor(private router: Router, private activatedRoot: ActivatedRoute) {
        console.log('AppComponent loaded');
    }
    ngOnInit() {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd),
            map(() => this.activatedRoot),
            map((route) => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            }),
            mergeMap((route) => route.data)
        ).subscribe((data) => {
            const metaInfo = data['meta'] || {};
            this.title = metaInfo['title'] || 'Script Social';
            this.stylesheets = metaInfo['stylesheets'] || [];
        });

        console.log('AppComponent ngOnInit');
        if (!this.name || this.name.trim() === "") {
            this.name = 'We did it!';
        }
    }
}