import {Injectable} from '@angular/core';
import Swal, {SweetAlertIcon, SweetAlertResult} from "sweetalert2";
import {Observable} from "rxjs";
import {HttpService} from "./http.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {
  }

  public static showAlert(title = '',
                          text = '',
                          icon: SweetAlertIcon = "success"): Promise<SweetAlertResult> {
    return Swal.fire({
      position: "top-end",
      icon,
      title,
      text,
      showConfirmButton: false
    });
  }

  public static showConfirm(title = '',
                            text = '',
                            promise?: Observable<any>,
                            icon: SweetAlertIcon = "warning"): Promise<SweetAlertResult> {
    return Swal.fire({
      position: "center",
      icon,
      title,
      text,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      allowOutsideClick: !Swal.isLoading,
      preConfirm: () => {
        if (promise) {
          return promise.pipe(catchError(HttpService.handleError));
        }

        return null;
      }
    });
  }

}
