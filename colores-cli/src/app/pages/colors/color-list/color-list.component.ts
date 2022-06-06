import {Component, OnInit} from '@angular/core';
import {Color} from "../../../model/Color";
import {ActivatedRoute, Router} from "@angular/router";
import {ColorsService} from "../../../services/colors.service";
import {Pagination} from "../../../model/Pagination";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ColorDetailComponent} from "../color-detail/color-detail.component";
import {AlertService} from "../../../services/alert.service";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  colorsDTO!: Pagination<Color>;
  loading = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private colorsService: ColorsService,
              private modalService: NgbModal,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.route.parent!.data.subscribe(data => {
      if (data['colors']) {
        this.colorsDTO = data['colors'];
      }
    })
  }

  paginateColors(page: number): void {
    this.loading = true;
    this.colorsService.getColors(page).subscribe(res => {
      this.colorsDTO = res;
      this.loading = false;
    }, err => {
      console.log('Error', err);
      this.loading = false;
    });
  }

  createColor(e: Event) {
    e.preventDefault();

    const modalRef = this.modalService.open(ColorDetailComponent);

    modalRef.result.then(res => {
      console.log(res);
      // Actualizamos en la pagina actual por si estamos en la ultima.
      this.paginateColors(this.colorsDTO.pageNumber);
    }).catch(err => {
      console.log(err);
    });
  }

  colorDetail(e: Event, color: Color) {
    e.preventDefault();

    //Aqui validamos que el usuario tenga permiso de administrador
    if (!this.authService.userHasRole(['ADMIN'])) {
      return;
    }

    // Consultamos en color en la API
    this.colorsService.getColor(color.id!).subscribe(res => {
      const modalRef = this.modalService.open(ColorDetailComponent);
      modalRef.componentInstance.color = color;

      modalRef.result.then(res => {
        console.log(res);
        let oldColorIdx = this.colorsDTO.content.findIndex(c => c.id == color.id);
        switch (res.action) {
          case 'update':
            this.colorsDTO.content[oldColorIdx] = res;
            break;
          case 'delete':
            this.paginateColors(this.colorsDTO.pageNumber);
            break;
        }

      }).catch(err => {
        console.log(err);
      });
    }, err => {
      AlertService.showServerErrorAlert(err);
    });
  }

  // Pagination

  previousPage(e: Event) {
    e.preventDefault();
    this.paginateColors(this.colorsDTO.pageNumber - 1);
  }

  nextPage(e: Event) {
    e.preventDefault();
    this.paginateColors(this.colorsDTO.pageNumber + 1);
  }
}
