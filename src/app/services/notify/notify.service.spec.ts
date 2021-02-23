import { TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { NotifyService } from './notify.service';

describe('ToastrService', () => {
  let service: NotifyService;
  const toast = jasmine.createSpyObj('ToastrService', ['success', 'error', 'info', 'warning']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule],
      providers: [{ provide: ToastrService, useValue: toast }]
    });
    service = TestBed.inject(NotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should show successful message', () => {
    spyOn(service, 'showSuccess').and.returnValue();
    service.showSuccess('A successful message', 'Title of the form');
    expect(service.showSuccess).toHaveBeenCalledWith('A successful message', 'Title of the form');
    expect(service.showSuccess).toHaveBeenCalledTimes(1);
  });
  it('should show an error message', () => {
    spyOn(service, 'showError').and.returnValue();
    service.showError('An Error message', 'Title of the form');
    expect(service.showError).toHaveBeenCalledWith('An Error message', 'Title of the form');
    expect(service.showError).toHaveBeenCalledTimes(1);
  });
});
