import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(public appState:AppStateService) {

  }

  totalCheckedProducts() {
    let checkedProducts=this.appState.productState.products.filter((p:any)=>p.checked==true)
    return checkedProducts.length;
  }
}
