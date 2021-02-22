import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-insert-game-promo',
  templateUrl: './insert-game-promo.component.html',
  styleUrls: ['./insert-game-promo.component.scss']
})
export class InsertGamePromoComponent implements OnInit {
  gameID = 0;

  insertPromoForm = this.fb.group({
    promoDiscount: ['', Validators.required],
    endDate: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private apollo: Apollo, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      const id = param.get('id');
      if (id) {
        this.gameID = +id;
      }
    });
  }

  // tslint:disable-next-line:typedef
  submitPromo() {
    if (this.insertPromoForm.invalid) {
      return;
    }
    this.apollo.mutate({
      mutation: gql`mutation insertPromo($gameID: ID!, $discountPromo: Int!, $endDate: Time!) {
        insertPromo (input: {gameID: $gameID, discountPromo: $discountPromo, endDate: $endDate}) {
        id
        }
      }`, variables: {
        gameID: this.gameID,
        discountPromo: this.insertPromoForm.value.promoDiscount,
        endDate: new Date(this.insertPromoForm.value.endDate).toISOString()
      }
    }).subscribe(resp => {
      console.log('Success!');
      alert('Success Insert Promo!');
    });
  }
}
