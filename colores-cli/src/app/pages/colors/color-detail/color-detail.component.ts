import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Color} from "../../../model/Color";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ColorsService} from "../../../services/colors.service";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-color-detail',
  templateUrl: './color-detail.component.html',
  styleUrls: ['./color-detail.component.css']
})
export class ColorDetailComponent implements OnInit {

  color: Color = new Color(null, null, null, null, null);
  loading = false;
  colorForm!: FormGroup;
  isCreating = false;

  constructor(private route: ActivatedRoute,
              public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private colorsService: ColorsService) {
  }

  ngOnInit(): void {
    // Hacemos una copia profunda del objeto para que en la interfaz no se vean reflejados los cambios al escribir
    // en el formulario.
    if (this.color.id) {
      this.color = JSON.parse(JSON.stringify(this.color));
    }

    this.isCreating = !this.color.id;

    this.initForm();
  }

  initForm() {
    this.colorForm = this.fb.group({
      name: [this.color.name || '', Validators.required],
      color: [this.color.color || '', Validators.required],
      pantone: [this.color.pantone || '', Validators.required],
      period: [this.color.period || '', Validators.required]
    });
  }

  onKeyDown(e: any, input: 'name' | 'color' | 'pantone' | 'period') {
    let value = e.target.value;

    switch (input) {
      case "name":
        this.color.name = value;
        break;
      case "color":
        this.color.color = value;
        break;
      case "pantone":
        this.color.pantone = value;
        break;
      case "period":
        this.color.period = value;
        break;
    }
  }

  onSubmit() {
    this.loading = true;
    const color = this.colorForm.value;
    console.log(color);

    let newColor = new Color(this.isCreating ? null : this.color.id, color.name, color.color, color.pantone, color.period);

    this.colorsService.saveColor(newColor).subscribe(res => {
      console.log(res);
      this.activeModal.close({
        action: this.isCreating ? 'create' : 'update',
        content: res
      });
      this.loading = false;
      AlertService.showAlert('Color saved', 'Color successfully saved');
    }, err => {
      console.log(err);
      AlertService.showServerErrorAlert(err, 'Error saving color');
      this.loading = false;
    });
  }

  deleteColor(e: Event) {
    e.preventDefault();

    AlertService.showConfirm('Delete color', 'Are you sure you want to delete this color?',
      this.colorsService.deleteColor(this.color.id)).then(res => {
      if (res.isConfirmed) {
        AlertService.showAlert('Color deleted', 'Color successfully deleted');
        this.activeModal.close({
          action: 'delete',
          content: null
        });
      }
    });
  }
}
