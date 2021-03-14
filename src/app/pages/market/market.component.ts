import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  gameItem: any[] = [];
  page = 1;

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.apollo.query<{ getGameItem: any }>({
      query: gql`query getGameItem($page: Int!) {
        getGameItem(page: $page) {
          id,
          gameItemImg,
          gameItemName
        }
      }`, variables: {page: this.page}
    }).subscribe(res => {
      this.gameItem = res.data?.getGameItem;
    });
  }

  prevPage(): void {
    this.page--;
    this.apollo.query<{ getGameItem: any }>({
      query: gql`query getGameItem($page: Int!) {
        getGameItem(page: $page) {
          id,
          gameItemName,
          gameItemImg
        }
      }`, variables: {page: this.page}
    }).subscribe(resp => {
      this.gameItem = resp.data.getGameItem;
    });
  }

  nextPage(): void {
    this.page++;
    this.apollo.query<{ getGameItem: any }>({
      query: gql`query getGameItem($page: Int!) {
        getGameItem(page: $page) {
          id,
          gameItemName,
          gameItemImg
        }
      }`, variables: {page: this.page}
    }).subscribe(resp => {
      this.gameItem = resp.data.getGameItem;
    });
  }
}
