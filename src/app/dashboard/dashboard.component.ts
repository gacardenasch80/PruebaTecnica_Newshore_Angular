import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TableData } from '../md/md-table/md-table.component';
import { Router } from "@angular/router"
import { RestService } from '../rest.service';

import * as Chartist from 'chartist';
import { debugOutputAstAsTypeScript } from '@angular/compiler';

declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, public rest: RestService) { }
  public tableData: TableData;
  books: number = 0;
  author: number= 0;
  users: number = 0;
  token: string;
  modalIsOpen: boolean = false;
  /**
   * 
   * @param chart Funcion que se encarga de realizar la animación del chart
   */
  startAnimationForLineChart(chart: any) {
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;
      chart.on('draw', function(data: any) {

        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  }
  /**
   * Funcion para amnimar el chart
   * @param chart 
   */
  startAnimationForBarChart(chart: any) {
      let seq2: any, delays2: any, durations2: any;
      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data: any) {
        if (data.type === 'bar') {
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  }
  /**
   * Funcion que se invoca al cargar el formulario
   */
  public ngOnInit() {
    // this.token = localStorage.getItem('token');
    // if (this.token == null){
    //   this.router.navigate(['../pages/login'])
    // }
    //this.loadUsers();
    //this.loadAuthors();
    //this.loadBooks();
  }
  /**
   * Funcion que se ejecuta despues de cargar la vista
   */
  ngAfterViewInit() {
       const breakCards = true;
       if (breakCards === true) {
           // We break the cards headers if there is too much stress on them :-)
           $('[data-header-animation="true"]').each(function(){
               const $fix_button = $(this);
               const $card = $(this).parent('.card');
               $card.find('.fix-broken-card').click(function(){
                   const $header = $(this).parent().parent().siblings('.card-header, .card-image');
                   $header.removeClass('hinge').addClass('fadeInDown');

                   $card.attr('data-count', 0);

                   setTimeout(function(){
                       $header.removeClass('fadeInDown animate');
                   }, 480);
               });

               $card.mouseenter(function(){
                   const $this = $(this);
                   const hover_count = parseInt($this.attr('data-count'), 10) + 1 || 0;
                   $this.attr('data-count', hover_count);
                   if (hover_count >= 20) {
                       $(this).children('.card-header, .card-image').addClass('hinge animated');
                   }
               });
           });
       }
  }
  /**
   * Funcion que se encarga de cargar la cantidad de usuarios
   */
  loadUsers() {
    this.rest.getCountUsers(this.token).subscribe((resp: any) => {
      if (resp.toString() != "[object Object]") {
        this.users = resp;
      }
    }, (err) => {
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
  /**
   * Funcion que se encarga de cargar la cantidad de autores
   */
  loadAuthors() {
    this.rest.getCountAuthors(this.token).subscribe((resp: any) => {
      if (resp.toString() != "[object Object]") {
        this.author = resp;
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
  /**
   * Funcion que se encarga de cargar la cantidad de libros
   */
  loadBooks() {
    this.rest.getCountBooks(this.token).subscribe((resp: any) => {
      if (resp.toString() != "[object Object]") {
        this.books = resp;  
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
  /**
   * Funcion que se encarga de llamar al API para sincronizar la base de datos
   */
  onClickSync() {
        this.rest.postSyncronize(this.token).subscribe((resp: any) => {
          this.modalIsOpen = true;
        }, (err) => {
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
  /**
   * Funcion que se ejecuta al cerrar el modal
   */
  closeModal() {
    this.modalIsOpen = false;
    this.loadUsers();
    this.loadAuthors();
    this.loadBooks();
  }
}
