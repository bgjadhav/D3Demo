import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Line Chart';

    examples = [
        {
            title: 'Line Chart',
            route: '/line-chart'
        },
        {
            title: 'Multi  Line Chart',
            route: '/multi-series'
        },
        
    ];

}
