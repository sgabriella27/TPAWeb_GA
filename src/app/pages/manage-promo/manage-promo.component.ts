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
  page = 1;

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit(): void {
    this.apollo.query<{ getGamePaginate: any }>({
      query: gql`query getGame($page: Int!) {
        getGamePaginate(page: $page) {
          id
          gameTitle
          gameBanner
          promo {
            discountPromo
          }
        }
      }`, variables: {page: this.page}
    }).subscribe(res => {
      this.game = res.data?.getGamePaginate;
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

  prevPage() {
    this.page--;
    this.apollo.query<{ getGamePaginate: any }>({
      query: gql`query getGamePaginate($page: Int!) {
        getGamePaginate(page: $page) {
          id
          gameTitle
          gameBanner
        }
      }`, variables: {page: this.page}
    }).subscribe(res => {
      this.game = res.data?.getGamePaginate;
    });
  }

  nextPage() {
    this.page++;
    this.apollo.query<{ getGamePaginate: any }>({
      query: gql`query getGamePaginate($page: Int!) {
        getGamePaginate(page: $page) {
          id
          gameTitle
          gameBanner
        }
      }`, variables: {page: this.page}
    }).subscribe(res => {
      this.game = res.data?.getGamePaginate;
    });
  }
}
