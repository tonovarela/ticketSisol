
import { Component, inject, OnInit } from '@angular/core';
import { Categoria, Zona } from '../../../interfaces/ticket.interface';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { isMobile } from '../../../utils/mobileDetector';

import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


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
  router = inject(Router);

  ngOnInit(): void {
  }

  
  public categorias: Categoria[] = [
    { id_categoria: 1, descripcion: 'Internet' },
    { id_categoria: 2, descripcion: 'Telefono' },
    { id_categoria: 3, descripcion: 'Cable' },
    { id_categoria: 4, descripcion: 'Otros' }
  ];
  public zonas: Zona[] = [
    { id_zona: 1, descripcion: 'Zona 1' },
    { id_zona: 2, descripcion: 'Zona 2' },
    { id_zona: 3, descripcion: 'Zona 3' },
    { id_zona: 4, descripcion: 'Zona 4' }
  ];
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
      console.log('Formulario invalido');
      return;
    }
    this.solicitudForm.disable();
    const promise = new Promise((resolve, reject) => setTimeout(() => {
      resolve(true);
    }, 5000));
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
