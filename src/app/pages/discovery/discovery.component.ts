import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.scss']
})
export class DiscoveryComponent implements OnInit {

  discoveryGame: any[] = [];
  newGames: any[] = [];

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
      this.discoveryGame = resp.data?.getAllGame;
      console.log(this.discoveryGame);
    });

    this.apollo.query<{ getNewRelease: any[] }>({
      query: gql`
        query getNewRelease {
          getNewRelease {
            id,
            gameBanner,
            gameTitle
          }
        }`
    }).subscribe(resp => {
      this.newGames = resp.data.getNewRelease
    });
  }

  // tslint:disable-next-line:typedef
  showFile(id: number) {
    return this.sanitizer.bypassSecurityTrustUrl('http://localhost:8080/game/assets/' + id);
  }

}
