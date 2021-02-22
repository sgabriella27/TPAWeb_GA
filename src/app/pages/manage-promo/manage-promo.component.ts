import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manage-promo',
  templateUrl: './manage-promo.component.html',
  styleUrls: ['./manage-promo.component.scss']
})
export class ManagePromoComponent implements OnInit {
  game: any[] = [];

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit(): void {
    this.apollo.query<{ getGame: any }>({
      query: gql`query getGame {
        getGame {
          id
          gameTitle
          gameBanner
          promo {
            discountPromo
          }
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
      mutation: gql`mutation deletePromo($id: ID!) {
        deletePromo(id: $id){
          id
        }
      }`, variables: {id}
    }).subscribe(resp => {
      alert('Delete Promo Success!');
    });
  }
}
