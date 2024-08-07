
import { Component, computed, effect, EffectRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Mensaje, TipoMensaje } from '@interfaces/mensaje.interface';
import { UsuarioService } from '@services/usuario.service';
import { isMobile } from '@utils/mobileDetector';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrl: './bitacora.component.css',

})
export class BitacoraComponent implements OnInit, OnDestroy {

  activatedRoute = inject(ActivatedRoute);
  public isMobile = isMobile();
  public mensajes = signal<Mensaje[]>([]);
  nuevoMensaje: string = '';
  private usuarioService =inject(UsuarioService);

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
    this.activatedRoute.params.subscribe(({ id_ticket }) => {      
      this.cargarMensajes();      
    });

  }

  cargarMensajes() {
    
    this.mensajes.set([
      {categoria:'SYSTEM',avatar:'https://servicios.litoprocess.com/colaboradores/api/foto/3361',usuario:'',tipo:TipoMensaje.TEXTO, fecha:new Date,id:'1',mensaje: 'Ticket registrado  ', propio: false },
      {categoria:'USER',avatar:'https://servicios.litoprocess.com/colaboradores/api/foto/3361',usuario:'Gerente',tipo:TipoMensaje.TEXTO, fecha:new Date,id:'1',mensaje: 'Informacion de ticket ', propio: false },            
      {categoria:'SYSTEM',avatar:'https://servicios.litoprocess.com/colaboradores/api/foto/3361',usuario:'',tipo:TipoMensaje.TEXTO, fecha:new Date,id:'1',mensaje: 'Ticket cambio a pausado  ', propio: false },
      {categoria:'USER',avatar:'https://github.com/shadcn.png',usuario:'Varela',tipo:TipoMensaje.TEXTO, fecha:new Date,id:'1',mensaje: 'Adicional del ticket ', propio: true },      
    ]);
  }


  enviarMensaje() {
    if (this.nuevoMensaje.trim().length === 0) {
      return;
    }
    this.mensajes.set([...this.mensajes(), {categoria:'USER', avatar:'https://github.com/shadcn.png',usuario:'Varela',mensaje: this.nuevoMensaje, propio: true,id:this.mensajes().length.toString(),tipo:TipoMensaje.TEXTO,fecha:new Date }]);
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
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp','image/svg+xml'];
    const isImage = validImageTypes.includes(file.type);

    
    this.mensajes.set([...this.mensajes(), { 
      categoria:'USER',
      avatar:'https://github.com/shadcn.png',
      mensaje:'',
      usuario:'Varela',
      archivo:{        
        url,nombre:file.name}, propio: true, id:this.mensajes().length.toString(),tipo:isImage?TipoMensaje.IMAGEN:TipoMensaje.ARCHIVO,
      fecha:new Date }]);    
  }



}
