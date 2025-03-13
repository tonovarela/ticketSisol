import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
declare var DossierView: any;
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit, AfterViewInit {


  
  ngAfterViewInit(): void {
    const parameters1 = {
      BASE_URL: environment.baseURLDossier,
      projectID: '4144A4A74427236922F4B197856EB90B',
      dossierId: "66B199A849FBC3385C9CDB82249D8A69",
      username: environment.usuarioDossier,
      password: environment.passwordDossier,
      idDossier: "dossierReportes"
    };    
    const dossier1 = new DossierView(parameters1);
    dossier1.show();
   
  }


  error = { withError: false, mensaje: "" };
  dossierExistencias = null;
  dossierInventarios = null;


  ngOnInit(): void {
    //this.mostrarDatos();

  }
}
