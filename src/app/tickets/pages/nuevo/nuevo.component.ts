
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';


import { DocumentoAlta, Ticket } from '@interfaces/ticket.interface';
import { isMobile } from '@utils/mobileDetector';
import { TicketService } from '@services/ticket.service';
import { UsuarioService } from '@services/usuario.service';
import { blobToBase64 } from '@utils/blobtoBase64';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css',
  providers: [MessageService]
})
export class NuevoComponent implements OnInit {

  previewUrl: DocumentoAlta | undefined = undefined;
  fb = inject(FormBuilder);
  messageService = inject(MessageService);
  ticketService = inject(TicketService);
  usuarioService = inject(UsuarioService);
  router = inject(Router);



  riesgoSeleccionado: any;

  catalogoRiesgos: any[] = [
      { label:"Alto",color:"red",icon: 'pi pi-circle-fill text-pink-600' },
      { label:"Medio",color:"yellow",icon: 'pi pi-circle-fill text-yellow-600' },
      { label:"Bajo",color:"green",icon: 'pi pi-circle-fill text-green-600' }      
  ];

  ngOnInit(): void {
  }


  public categorias = this.ticketService.categorias;
  public zonas = this.ticketService.zonas;

  public isMobile = isMobile();

  solicitudForm = this.fb.group({
    id_zona: new FormControl('', [Validators.required]),
    id_categoria: new FormControl('', [Validators.required]),
    titulo: new FormControl('', [Validators.required]),
    riesgo: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    es_queja: new FormControl(false),

  });

  get totalCaracteres() {
    const descripcion = this.solicitudForm.get('descripcion')!.value || [];
    return descripcion.length;

  }

  async registrarSolicitud(event: Event) {

    event.preventDefault();
    this.solicitudForm.markAllAsTouched();
    if (this.solicitudForm.invalid) {
      return;
    }    
    const id_solicitante = this.usuarioService.StateAuth().usuario?.id!;
    const ticket: Ticket = {
      id_solicitante: id_solicitante,
      zona: this.zonas().find(z => z.id_zona.toString() == this.solicitudForm.get('id_zona')!.value!)?.descripcion!,
      id_categoria: this.solicitudForm.get('id_categoria')!.value!,
      id_zona: this.solicitudForm.get('id_zona')!.value!,
      descripcion: this.solicitudForm.get('descripcion')!.value!,
      titulo: this.solicitudForm.get('titulo')!.value!,
      fecha_registro: new Date(),
      dias_respuesta: 0,
      categoria: this.categorias.find(c => c.id_categoria.toString() == this.solicitudForm.get('id_categoria')!.value!)?.descripcion!,
      es_queja: this.solicitudForm.get('es_queja')!.value!,
      situacion: 'En proceso',
      riesgo: this.solicitudForm.get('riesgo')!.value!.toUpperCase(),
      id_estado: 3,
    };
    this.solicitudForm.disable();
    try {
      await firstValueFrom(this.ticketService.registrar(ticket, this.previewUrl));
      this.messageService.add({ severity: 'success', summary: 'Listo', detail: 'Solicitud registrada', life: 3000 })

    } catch (e) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo registrar la solicitud', life: 3000 })
    } finally {
      this.router.navigate(['/tickets/listado']);
      this.solicitudForm.enable();
      this.solicitudForm.reset();
      this.previewUrl = undefined;
    }





  }

  campoValido(nombreCampo: string) {
    if (this.solicitudForm.get(nombreCampo) == null) {
      return false;
    }
    return this.solicitudForm.get(nombreCampo)!.invalid
      && this.solicitudForm.get(nombreCampo)!.touched
  }

  async importarArchivo(event: Event) {
    event.preventDefault();
    const input = event.target as HTMLInputElement;
    if (!input.files?.length || !this.solicitudForm.enable) {
      return;
    }
    const file = input.files[0];
    const blob = new Blob([file], { type: file.type }); // Crea un blob a partir del archivo
    const url = URL.createObjectURL(blob); // Crea un URL para el blob    
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml'];
    const isImage = validImageTypes.includes(file.type);

    const stringBase64 = await blobToBase64(blob);
    this.previewUrl = { src: url, name: file.name, isImage, type: file.type, base64: stringBase64.split(",")[1] };

  }

  eliminarArchivo() {
    if (!this.solicitudForm.enabled) {
      return
    }
    this.previewUrl = undefined;
  }






}
