
import { Component, computed, effect, EffectRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output, signal, ViewChild } from '@angular/core';

import { Mensaje, TipoMensaje } from '@interfaces/mensaje.interface';
import { UsuarioService } from '@services/usuario.service';
import { isMobile } from '@utils/mobileDetector';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.css',

})
export class BitacoraComponent implements OnInit, OnDestroy {


  @Input('id_ticket') id_ticket: string = '0';
  @Input('messages') mensajes = signal<Mensaje[]>([]);
  @Output('onClose') onClose = new EventEmitter<void>();
  @Output('onNewMessage') onNuevoMensaje = new EventEmitter<Mensaje>();


  public isMobile = isMobile();
  
  nuevoMensaje: string = '';
  private usuarioService = inject(UsuarioService);

  urlphoto = computed(() => this.usuarioService.StateAuth().usuario!.photoURL || '');
  username = computed(() => this.usuarioService.StateAuth().usuario!.username || '');

  @ViewChild('cameraRef') cameraRef: HTMLInputElement | undefined;
  @ViewChild('fileRef') fileRef: HTMLInputElement | undefined;


  effectRef: EffectRef = effect(() => {
    if (this.mensajes().length > 0) {
      this.actualizarScroll();
    }
  });


  ngOnInit(): void {
  
  }


  enviarMensaje() {
    if (this.nuevoMensaje.trim().length === 0) {
      return;
    }    
    this.onNuevoMensaje.emit({
        categoria: 'USER',
        avatar: this.urlphoto(), usuario: this.username(),
        mensaje: this.nuevoMensaje, propio: true, id: this.mensajes().length.toString(), tipo: TipoMensaje.TEXTO, fecha: new Date
      }
    );
    this.nuevoMensaje = '';
  }
  onKeyUp(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
      return;
    }
    this.enviarMensaje();
  }

  actualizarScroll() {
    const element = document.getElementById('bottom');
    setTimeout(() => {
      element!.scrollTo({ top: element!.scrollHeight, behavior: 'smooth' });
    }, 100);
  }




  ngOnDestroy(): void {
    this.effectRef.destroy();
  }

  importarArchivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    //TODO: subir archivo
    const file = input.files[0];
    const blob = new Blob([file], { type: file.type }); // Crea un blob a partir del archivo
    const url = URL.createObjectURL(blob); // Crea un URL para el blob        
    const isImage = file.type.includes('image');
    const mensaje: Mensaje = {
      categoria: 'USER',
      avatar: this.urlphoto(), usuario: this.username(),
      mensaje: '',
      archivo: {
        url,
        nombre: file.name
      },
      propio: true,
      id: this.mensajes().length.toString(),
      tipo: isImage ? TipoMensaje.IMAGEN : TipoMensaje.ARCHIVO,
      fecha: new Date
    };
    this.onNuevoMensaje.emit(mensaje);    
  }

  cerrar() {
    this.onClose.emit();
  }



}
