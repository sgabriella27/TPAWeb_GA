import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-manage-game-home',
  templateUrl: './manage-game-home.component.html',
  styleUrls: ['./manage-game-home.component.scss']
})
export class ManageGameHomeComponent implements OnInit {

  game: any[] = [];

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.apollo.query<{ getGame: any }>({
      query: gql`query getGame {
        getGame {
          id
          gameTitle
          gameBanner
        }
      }`
    }).subscribe(res => {
      this.game = res.data?.getGame;
    });
  }

  // tslint:disable-next-line:typedef
  showFile(id: number) {
    return this.sanitizer.bypassSecurityTrustUrl('http://localhost:8080/game/assets/' + id);
  }

  onDelete(id: number): void {
    this.apollo.mutate({
      mutation: gql`mutation deleteGame($id: ID!) {
        deleteGame(id: $id) {
          id
        }
      }`, variables: {id}
    }).subscribe();
  }
}
