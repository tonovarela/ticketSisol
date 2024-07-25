
import { Component, inject, OnInit } from '@angular/core';
import { Ticket } from '../../../interfaces/ticket.interface';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { isMobile } from '../../../utils/mobileDetector';

import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css',
  providers: [MessageService]
})
export class NuevoComponent implements OnInit {

  previewUrl: { src: string, name: string, isImage: boolean } | null = null;
  fb = inject(FormBuilder);
  messageService = inject(MessageService);
  ticketService = inject(TicketService);
  router = inject(Router);

  ngOnInit(): void {
  }

  
  public categorias= this.ticketService.categorias;
  public zonas= this.ticketService.zonas;

  public isMobile = isMobile();

  solicitudForm = this.fb.group({
    id_zona: new FormControl('', [Validators.required]),
    id_categoria: new FormControl('', [Validators.required]),
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    es_queja: new FormControl(false),
    id_solicitante: ['5'],


  });

  get totalCaracteres() {
    const descripcion = this.solicitudForm.get('descripcion')!.value || [];
    return descripcion.length;

  }

  async registrarSolicitud() {
    this.solicitudForm.markAllAsTouched();
    if (this.solicitudForm.invalid) {      
      return;
    }
    const ticket :Ticket ={
      id_ticket: 'XXX',
      zona: this.zonas.find(z=>z.id_zona.toString()==this.solicitudForm.get('id_zona')!.value!)?.descripcion!,
      solicitante: "Marco Estelles",      
      titulo: this.solicitudForm.get('titulo')!.value!,
      registro: new Date(),
      dias_respuesta: 0,
      categoria:this.categorias.find(c=>c.id_categoria.toString()==this.solicitudForm.get('id_categoria')!.value!)?.descripcion!,
      es_queja: this.solicitudForm.get('es_queja')!.value!,
      asignado: '---',
      situacion: 'En proceso',      
      id_estado: 1
    };
    this.ticketService.registrar(ticket);
    this.solicitudForm.disable();
    const promise = new Promise((resolve, reject) => setTimeout(() => {
      resolve(true);
    }, 1000));
    await promise;
    
    this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Solicitud registrada', life: 3000 })
    this.solicitudForm.enable();
    this.solicitudForm.reset();
    this.previewUrl = null;
    this.router.navigate(['/tickets/listado']);    

  }

  campoValido(nombreCampo: string) {
    if (this.solicitudForm.get(nombreCampo) == null) {
      return false;
    }
    return this.solicitudForm.get(nombreCampo)!.invalid
      && this.solicitudForm.get(nombreCampo)!.touched
  }

  importarArchivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length || !this.solicitudForm.enable) {
      return;
    }
    const file = input.files[0];
    const blob = new Blob([file], { type: file.type }); // Crea un blob a partir del archivo
    const url = URL.createObjectURL(blob); // Crea un URL para el blob    
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml'];
    const isImage = validImageTypes.includes(file.type);
    this.previewUrl = { src: url, name: file.name, isImage };

  }

  eliminarArchivo() {
    if (!this.solicitudForm.enabled) {
      return
    }
    this.previewUrl = null;
  }






}
