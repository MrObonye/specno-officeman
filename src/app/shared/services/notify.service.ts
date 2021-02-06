import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private toastr: ToastrService) { }
    // Toast messages

    showSuccess(message: string, header: string): void {
      this.toastr.success('Office Updated Successfully!', 'Update Office');
    }
    delSuccess(message: string, header: string): void {
      this.toastr.success('Office deleted successfully!', 'Delete Office');
    }
    showError(message: string, header: string): void {
      this.toastr.error('Oops! Something went wrong on our side!', 'Office');
    }
}
