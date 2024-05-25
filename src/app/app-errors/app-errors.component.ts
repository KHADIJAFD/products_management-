import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-app-errors',
  standalone: true,
  imports: [
    JsonPipe,
    NgIf
  ],
  templateUrl: './app-errors.component.html',
  styleUrl: './app-errors.component.css'
})
export class AppErrorsComponent {
  constructor(public appState:AppStateService) {
  }
}
