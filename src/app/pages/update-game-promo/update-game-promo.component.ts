import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-game-promo',
  templateUrl: './update-game-promo.component.html',
  styleUrls: ['./update-game-promo.component.scss']
})
export class UpdateGamePromoComponent implements OnInit {
  updatePromoForm = this.fb.group({
    promoDiscount: ['', Validators.required],
    endDate: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private apollo: Apollo, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.apollo.query<{ getPromo: any }>({
      query: gql`query getPromo($gameID: ID!) {
        getPromo(gameID: $gameID) {
          discountPromo
          endDate
        }
      }`, variables: {gameID: this.route.snapshot.paramMap.get('id')}
    }).subscribe(resp => {
      const promo = resp.data?.getPromo;
      const endDate = new Date(promo.endDate);
      this.updatePromoForm.controls.promoDiscount.setValue(promo.discountPromo);
      this.updatePromoForm.controls.endDate.setValue(`${endDate.getFullYear()}-${('0' + (endDate.getMonth() + 1)).slice(-2)}-${('0' + endDate.getDate()).slice(-2)}`);
    });
  }

  updatePromo() {
    this.apollo.mutate({
      mutation: gql`mutation updatePromo($gameID: ID!, $discountPromo: Int!, $endDate: Time!){
        updatePromo(input: {gameID: $gameID, discountPromo: $discountPromo, endDate: $endDate}){
          id
        }
      }`,
      variables: {
        gameID: this.route.snapshot.paramMap.get('id'),
        discountPromo: this.updatePromoForm.value.promoDiscount,
        endDate: new Date(this.updatePromoForm.value.endDate)
      }
    }).subscribe(resp => {
      if (resp.data) {
        alert('Update Success yeay!');
      }
    });
  }
}
