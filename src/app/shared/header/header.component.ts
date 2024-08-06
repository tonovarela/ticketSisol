
import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(300)).subscribe((searchValue) => this.actualizarListado({ target: { value: searchValue } }, 'patron'));
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
