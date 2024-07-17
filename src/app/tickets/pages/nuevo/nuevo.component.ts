
import { Component } from '@angular/core';
import { MensajeComponent } from '../../components/mensaje/mensaje.component';

@Component({
  selector: 'app-nuevo',

  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css',
})
export class NuevoComponent {
  nuevoMensaje: string = '';

  mensajes: any[] = [
    { mensaje: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam voluptates quae voluptatum dolore fugiat natus molestias esse, quasi consequatur magni perspiciatis nisi, velit dolorum reiciendis, eveniet eaque odio corporis tenetur.', propio: true, foto: 'https://www.google.com' },
    { mensaje: 'Hola que tal', propio: false, foto: 'https://www.google.com' },
    { mensaje: 'Hola desde aqui?', propio: true, foto: 'https://www.google.com' },
    { mensaje: 'En serio?', propio: false, foto: 'https://www.google.com' },
    { mensaje: 'Uff', propio: true, foto: 'https://www.google.com' },
    { mensaje: 'No me digas.', propio: false, foto: 'https://www.google.com' },
    { mensaje: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam voluptates quae voluptatum dolore fugiat natus molestias esse, quasi consequatur magni perspiciatis nisi, velit dolorum reiciendis, eveniet eaque odio corporis tenetur.', propio: true, foto: 'https://www.google.com' },
    { mensaje: 'Hola que tal', propio: false, foto: 'https://www.google.com' },
    { mensaje: 'Hola desde aqui?', propio: true, foto: 'https://www.google.com' },
    { mensaje: 'En serio?', propio: false, foto: 'https://www.google.com' },
    { mensaje: 'Uff', propio: true, foto: 'https://www.google.com' },
    { mensaje: 'No me digas.', propio: false, foto: 'https://www.google.com' },
    { mensaje: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam voluptates quae voluptatum dolore fugiat natus molestias esse, quasi consequatur magni perspiciatis nisi, velit dolorum reiciendis, eveniet eaque odio corporis tenetur.', propio: true, foto: 'https://www.google.com' },
    { mensaje: 'Hola que tal', propio: false, foto: 'https://www.google.com' },
    { mensaje: 'Hola desde aqui?', propio: true, foto: 'https://www.google.com' },
    { mensaje: 'En serio?', propio: false, foto: 'https://www.google.com' },
    { mensaje: 'Uff', propio: true, foto: 'https://www.google.com' },
    { mensaje: 'No me digas.', propio: false, foto: 'https://www.google.com' },
    { mensaje: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam voluptates quae voluptatum dolore fugiat natus molestias esse, quasi consequatur magni perspiciatis nisi, velit dolorum reiciendis, eveniet eaque odio corporis tenetur.', propio: true, foto: 'https://www.google.com' },
    { mensaje: 'Hola que tal', propio: false, foto: 'https://www.google.com' },
    { mensaje: 'Hola desde aqui?', propio: true, foto: 'https://www.google.com' },
    { mensaje: 'En serio?', propio: false, foto: 'https://www.google.com' },
    { mensaje: 'Uff', propio: true, foto: 'https://www.google.com' },
    { mensaje: 'No me digas.', propio: false, foto: 'https://www.google.com' },
    { mensaje: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam voluptates quae voluptatum dolore fugiat natus molestias esse, quasi consequatur magni perspiciatis nisi, velit dolorum reiciendis, eveniet eaque odio corporis tenetur.', propio: true, foto: 'https://www.google.com' },
    { mensaje: 'Hola que tal', propio: false, foto: 'https://www.google.com' },
    { mensaje: 'Hola desde aqui?', propio: true, foto: 'https://www.google.com' },
    { mensaje: 'En serio?', propio: false, foto: 'https://www.google.com' },
    { mensaje: 'Uff', propio: true, foto: 'https://www.google.com' },
    { mensaje: 'No me digas.', propio: false, foto: 'https://www.google.com' },
  ];


  enviarMensaje() {
    if (this.nuevoMensaje.trim().length === 0) {
      return;
    }
    this.mensajes.push({ mensaje: this.nuevoMensaje, propio: true, foto: 'https://www.google.com' });
    this.nuevoMensaje = '';
  }
  onKeyUp(event: any) {
    if (event.key === 'Enter') {
      this.enviarMensaje();
      const element = document.getElementById('bottom');
      element!.scrollTop = element!.scrollHeight;
    }
  }

}
