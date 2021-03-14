import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  PointsShopPage() {
    this.router.navigate(['/points/shop']).then();
  }
}
