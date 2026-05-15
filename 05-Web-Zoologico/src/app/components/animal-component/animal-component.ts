import { AnimalService } from '../../services/animal-service';
import { take } from 'rxjs/internal/operators/take';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animal-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './animal-component.html',
  styleUrl: './animal-component.css',
})
export class AnimalComponent {

  animalList: any = [];
  animalForm: FormGroup | any;
  idAnimal: any;
  editableAnimal: boolean = false;

  constructor(
    private animalService: AnimalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) { }

  getAllAnimals() {
    this.animalService.getAllAnimalsData().subscribe((data: {}) => {
      this.animalList = data;
    });
  }

  newMessage(messageText: string) {
    this.toastr.success('Clic aquí para actualizar la lista', messageText)
      .onTap
      .pipe(take(1))
      .subscribe(() => { window.location.reload() });
  }

  newAnimalEntry() {
    this.animalService.newAnimal(this.animalForm.value)
      .subscribe(
        () => {
          this.getAllAnimals(); // Recarga la lista dinámicamente
          this.animalForm.reset(); // Limpia el formulario
          this.toastr.success('El animal ha sido registrado correctamente.', 'Registro exitoso');
        }
      );
  }

  toggleEditAnimal(id: any) {
    console.log(this.editableAnimal);
    this.idAnimal = id;
    console.log(this.idAnimal)
    this.animalService.getOneAnimal(id).subscribe(
      data => {
        this.animalForm.setValue({
          nombre: data.nombre,
          edad: data.edad,
          tipo: data.tipo,
        });
      }
    );
    this.editableAnimal = !this.editableAnimal;
  }

  updateAnimalEntry() {
    //Removiendo valores vacios del formulario de actualización​
    for (let key in this.animalForm.value) {
      if (this.animalForm.value[key] === '') {
        this.animalForm.removeControl(key);
      }
    }
    this.animalService.updateAnimal(this.idAnimal, this.animalForm.value).subscribe(
      () => {
        //Enviando mensaje de confirmación​
        this.newMessage("Animal editado");
      }
    );
  }

  deleteAnimalEntry(id: any) {
    console.log(id)
    this.animalService.deleteAnimal(id).subscribe(
      () => {
        //Enviando mensaje de confirmación​
        this.newMessage("Animal eliminado");
      }
    );
  }

  ngOnInit() {
    this.animalForm = this.formBuilder.group({
      nombre: '',
      edad: 0,
      tipo: '',
    });
    this.getAllAnimals();
  }

}
