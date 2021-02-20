import { TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NotifyService } from './notify.service';

describe('ToastrService', () => {
    let service: NotifyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ToastrModule],
            providers: [{provide: ToastrService, useValue: ToastrService}]
        });
        service = TestBed.inject(NotifyService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
