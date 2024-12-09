
import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TicketService } from '@services/ticket.service';
import { UiService } from '@services/ui.service';
import { UsuarioService } from '@services/usuario.service';
import { debounceTime, Subject } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})

export class HeaderComponent implements OnInit, OnDestroy {
  visible: boolean = false;
  mostrarFiltro = true;
  router = inject(Router)
  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => this.actualizarListado({ target: { value: searchValue } }, 'patron'));
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.mostrarFiltro = val.url === '/tickets/listado'
      }

    });

  }
  ticketService = inject(TicketService);
  
  estados = computed(() => this.ticketService.estados());
  usuarioService = inject(UsuarioService);
  inputText: string = '';
  public uiService = inject(UiService);
  private searchSubject = new Subject<string>();

  usuario = computed(() => {
    return this.usuarioService.StateAuth().usuario || { name: '', photoURL: '', id: '', username: '', email: '' };
  });

  ngOnDestroy() {
    this.searchSubject.complete();
  }


  irReportes() {
    this.router.navigate(['/reportes']);
  }

  cerrarSesion() {
    this.usuarioService.closeSession();
  }

  actualizarListado($event: any, campo: | 'estados' | 'total' | 'patron', cerrarModal: boolean = false) {
    if (cerrarModal) {
      this.visible = false;
    }
    if (campo === 'estados') {
      this.ticketService.estadoFiltro.set(+$event.target.value);
      this.inputText = '';
    }
    if (campo === 'total') {
      this.ticketService.totalRows.set(+$event.target.value);
      //this.ticketService.filtroTickets.set({ ...this.ticketService.filtroTickets(), totalRows: +$event.target.value });
    }
    if (campo === 'patron') {
      this.ticketService.patron.set($event.target.value);
      //this.ticketService.filtroTickets.set({ ...this.ticketService.filtroTickets(), patron: $event.target.value });
    }
  }


  onSearch() {
    this.searchSubject.next(this.inputText);
  }

  mostrarModalFiltro() {
    this.visible = true;

  }







}
