import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AppStateService} from "../services/app-state.service";
import { CommonModule } from '@angular/common';
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink,
         CommonModule
    ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  actions : Array<any>=[
    {title:"Home",route:"/Home",icon:"house"},
    {title:"Products",route:"/products",icon:"search"},
    {title:"new product",route:"/NewProduct",icon:"safe"}
  ];
  CurrentAction:any;

  setCurrentAction(action: any) {
    this.CurrentAction=action;
  }

  constructor(public appState:AppStateService, public loadingService:LoadingService) {
  }

}
