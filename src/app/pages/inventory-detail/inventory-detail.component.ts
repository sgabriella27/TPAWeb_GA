import {Component, OnInit} from '@angular/core';
import {ChartDataSets} from 'chart.js';
import {Label} from 'ng2-charts';
import {Apollo, gql} from 'apollo-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss']
})
export class InventoryDetailComponent implements OnInit {

  chartData: ChartDataSets[] = [{data: [], label: 'price'}];
  labelData: Label[] = [];
  gameItem: any;
  id: any;

  constructor(private apollo: Apollo, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
      this.apollo.query<{ getGameItemByID: any }>({
        query: gql`query getGameItemByID($id: ID!) {
          getGameItemByID(id: $id) {
            id,
            gameItemDesc,
            gameItemImg,
            gameItemName,
            game {
              gameTitle
            }
            transaction {
              gameItemID,
              price,
              createdAt
            }
          }
        }`, variables: {id: param.get('id')}
      }).subscribe(resp => {
        this.gameItem = resp.data.getGameItemByID;
        // @ts-ignore
        this.gameItem.transaction.forEach((data) => {
          // @ts-ignore
          this.chartData[0].data.push(data.price);
          this.labelData.push(data.createdAt);
        });
        console.log(this.gameItem);
      });
    });
  }

}
