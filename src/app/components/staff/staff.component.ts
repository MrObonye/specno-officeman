import { Component, OnInit } from '@angular/core';
import { Staff } from 'src/app/models/staff.model';
import { Subject } from 'rxjs';
import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  staffMembers: Staff[];
  startAt = new Subject();
  endAt = new Subject();
  lastKeypress = 0;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
   /*  this.searchService.getStaff(this.startAt, this.endAt).subscribe(staff => {
      this.staffMembers = staff;
    }); */
  }
  search($event): void {
    if ($event.timestamp - this.lastKeypress > 200) {
      const q = $event.target.value;
      this.startAt.next(q);
      this.endAt.next(q + '\uf8ff');
    }
    this.lastKeypress = $event.timestamp;
  }

}
