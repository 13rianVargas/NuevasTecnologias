import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AnimalComponent } from './components/animal-component/animal-component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, AnimalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('05-Web-Zoologico');
  protected readonly alias = "13rian";
}
