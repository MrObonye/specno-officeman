import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private toastr: ToastrService) { }
    // Toast messages

    showSuccess(message: string, header: string): void {
      this.toastr.success(message, header);
    }
    delSuccess(message: string, header: string): void {
      this.toastr.success(message, header);
    }
    showError(message: string, header: string): void {
      this.toastr.error(message, header);
    }
}
