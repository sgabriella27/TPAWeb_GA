import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  game: any[] = [];

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit(): void {
    this.apollo.query<{ getAllGame: any }>({
      query: gql`query getAllGame {
        getAllGame {
          id,
          gameBanner,
          gameTitle
        }
      }`
    }).subscribe(resp => {
      this.game = resp.data?.getAllGame;
    });
  }

  // tslint:disable-next-line:typedef
  showFile(id: number) {
    return this.sanitizer.bypassSecurityTrustUrl('http://localhost:8080/game/assets/' + id);
  }

}
