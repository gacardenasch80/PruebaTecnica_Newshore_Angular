import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { PasswordValidation } from '../../forms/validationforms/password-validator.component';

import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';
import { Router } from "@angular/router"
import { element } from 'protractor';
import * as XLSX from 'xlsx'; 



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


declare const $: any;

@Component({
    selector: 'app-data-table-cmp',
    templateUrl: 'datatable.component.html'
})

  
export class DataTableComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router, public rest: RestService) { }

  public dataTable: DataTable;
  public dataTableSearch: SearchDataTable;
  factorConversion: number;
  form:FormGroup;


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  validEmailRegister: boolean = false;
  validConfirmPasswordRegister: boolean = false;
  validPasswordRegister: boolean = false;

  validEmailLogin: boolean = false;
  validPasswordLogin: boolean = false;

  validTextType: boolean = false;
  validEmailType: boolean = false;
  validNumberType: boolean = false;
  validUrlType: boolean = false;
  pattern = "https?://.+";
  validSourceType: boolean = false;
  validDestinationType: boolean = false;

  matcher = new MyErrorStateMatcher();
  register : FormGroup;
  login : FormGroup;
  type : FormGroup;
  
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }

  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }

  onRegister() {
    if (this.register.valid) {
    } else {
      this.validateAllFormFields(this.register);
    }
  }
  onLogin() {
    if (this.login.valid) {
    } else {
      this.validateAllFormFields(this.login);
    }
  }
  onType() {
    if (this.type.valid) {
    } else {
      this.validateAllFormFields(this.type);
    }
  }
  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  validateInfo(action: string, run: string) {
    let origin: string, destination: string, error:boolean, err:string ;
    error = false;
    origin = this.dataTableSearch.origin.toUpperCase();
    destination = this.dataTableSearch.destination.toUpperCase();
    if ((origin==="") && (destination==="")){
      return;
    }
    if(action == "VALIDATE_ORIGIN"){
      origin = run.toUpperCase();
      if (origin===destination){
        err = "El campo origen no puede ser igual al destino";
          $.notify({
            icon: "notifications",
            message: err
        }, {
            type: 'danger',
            timer: 4000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
        this.dataTableSearch.origin = "";
      }
    }

    if(action == "VALIDATE_DESTINO"){
      destination = run.toUpperCase();
      if (origin===destination){
        err = "El campo destino no puede ser igual al origen";
          $.notify({
            icon: "notifications",
            message: err
        }, {
            type: 'danger',
            timer: 4000,
            placement: {
                from: 'top',
                align: 'right'
            }
        });
        this.dataTableSearch.destination = "";
      }
    }


  }

  textValidationType(e){
    if (e) {
        this.validTextType = true;
    }else{
      this.validTextType = false;
    }
}
numberValidationType(e){
  if (e) {
      this.validNumberType = true;
  }else{
    this.validNumberType = false;
  }
}
  token: string;
  

  /*name of the excel-file which will be downloaded. */ 
  fileName= 'ExcelSheet.xlsx';  
  
  exportexcel(): void 
  {
      /* table id is passed over here */   
      let element = document.getElementById('datatablesNew'); 
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    
  }

  ngOnInit() {
    this.dataTableSearch = {
      origin:"",
      destination:"",
      numeroMaxVuelos:0,
      factorConversion:1,
      precio:"USD 0",
      moneda:"USD"
    }
    this.dataTable = {
      headerRow: ['Origen', 'Destino', 'Precio', 'Aerolinea', 'Numero Vuelo'],
      footerRow: ['Origen', 'Destino', 'Precio', 'Aerolinea', 'Numero Vuelo'],
      dataRows: []
    };

    this.factorConversion = 1; 
    this.BuildForm();   
  }

  private BuildForm(){
    this.form = this.formBuilder.group({
      origin:['', [Validators.required]],
      destination:['', [Validators.required]],
      numeroMaxVuelos:['', []],
      precio:['', []],
      moneda:['', []]
    })
  }

  get originField() {
    return this.form.get('origin').value;
  }

  get destinationField() {
    return this.form.get('destination').value;
  }

  get numeroMaxVuelosField() {
    return this.form.get('numeroMaxVuelos').value;
  }
  get monedaField() {
    return this.form.get('moneda').value;
  }
  get precioField() {
    return this.form.get('precio').value;
  }

  loadGridJourneySearch() {
    let origin: string, destination: string, numeroMaxVuelos: string;
    origin = this.dataTableSearch.origin.toUpperCase();
    destination = this.dataTableSearch.destination.toUpperCase();
    numeroMaxVuelos = this.dataTableSearch.numeroMaxVuelos.toString();
    if (this.form.invalid) {
      this.validateAllFormFields(this.form);
      if (origin===""){
        let err = "El campo origen no puede ser vacio";
        $.notify({
          icon: "notifications",
          message: err
        }, {
          type: 'danger',
          timer: 4000,
          placement: {
              from: 'top',
              align: 'right'
          }
        });        
      }
      if (destination===""){
        let err = "El campo destino no puede ser vacio";
        $.notify({
          icon: "notifications",
          message: err
        }, {
          type: 'danger',
          timer: 4000,
          placement: {
              from: 'top',
              align: 'right'
          }
        });        
      }
      return;
    }

    this.dataTableSearch.factorConversion = 1;
    if (this.dataTableSearch.moneda==="COP"){ 
      this.dataTableSearch.factorConversion = 4173;
    }
    if (this.dataTableSearch.moneda==="EUR"){ 
      this.dataTableSearch.factorConversion = 0.9172;
    }
    if (numeroMaxVuelos==="0"){
      numeroMaxVuelos="-1";
    }
    //factorCoversion =1;
    this.rest.JourneyGet(origin,destination,numeroMaxVuelos).subscribe((resp: any) => {
      var data = [];
        if (resp.journey !==null){
          this.dataTableSearch.precio = this.dataTableSearch.moneda +" "+ (resp.journey.price*this.dataTableSearch.factorConversion).toString();
          resp.journey.flights.forEach(
            function (item){
             data.push(Object.values(item));
            }
          ) 
           this.dataTable = {
             headerRow: ['Origen', 'Destino', 'Precio', 'Aerolinea', 'Numero Vuelo'],
             footerRow: ['Origen', 'Destino', 'Precio', 'Aerolinea', 'Numero Vuelo'],
             dataRows: data
           };        
        }else{
          this.dataTableSearch.precio = this.dataTableSearch.moneda +" "+ (0*this.dataTableSearch.factorConversion).toString();
          this.dataTable = {
            headerRow: ['Origen', 'Destino', 'Precio', 'Aerolinea', 'Numero Vuelo'],
            footerRow: ['Origen', 'Destino', 'Precio', 'Aerolinea', 'Numero Vuelo'],
            dataRows: data
          };
        }
        },(err) => {
            $.notify({
                icon: "notifications",
                message: err
            }, {
                type: 'danger',
                timer: 4000,
                placement: {
                    from: 'top',
                    align: 'right'
                }
            });
     }); 
  }

}
