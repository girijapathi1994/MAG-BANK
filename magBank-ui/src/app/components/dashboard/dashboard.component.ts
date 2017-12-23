import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';
declare var Plotly: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
@ViewChild('chart') el:ElementRef;

  constructor() { }

  ngOnInit() {
    this.basicChart();
  }
basicChart(){
const element=this.el.nativeElement;
const data=[{
  x:[10,20,30,40,50],
  y:[10,56,78,40,8]
}];
const style={
  margin:{t:1}
};
Plotly.plot(element,data,style,{displayModeBar: true});


}
}
