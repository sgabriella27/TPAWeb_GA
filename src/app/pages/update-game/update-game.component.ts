import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-update-game',
  templateUrl: './update-game.component.html',
  styleUrls: ['./update-game.component.scss']
})
export class UpdateGameComponent implements OnInit {

  game: any;

  updateGameForm = this.fb.group({
    gameTitle: ['', Validators.required],
    gameDescription: ['', Validators.required],
    gamePrice: [0, Validators.required],
    gamePublisher: ['', Validators.required],
    gameDeveloper: ['', Validators.required],
    gameTag: ['', Validators.required],
    gameSystemRequirement: ['', Validators.required],
    gameAdult: [false, Validators.required],
    gameBanner: [null],
    gameSlideshow: [[]]
  });

  constructor(private fb: FormBuilder, private apollo: Apollo, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.apollo.query({
      query: gql`query getGameByID($id: ID!){
        gameByID(id: $id){
          id
          gameTitle
          gameDescription
          gamePrice
          gameDeveloper
          gamePublisher
          gameSystemRequirement
          gameBanner
          gameTag
          gameSlideshow{
            id
            contentType
          }
          gameAdult
        }
      }`, variables: {id}
    }).subscribe(resp => {
      this.game = (resp?.data as any)?.gameByID;
      console.log(this.game);
      this.updateGameForm.controls.gameTitle.setValue(this.game.gameTitle);
      this.updateGameForm.controls.gameDescription.setValue(this.game.gameDescription);
      this.updateGameForm.controls.gameTag.setValue(this.game.gameTag);
      this.updateGameForm.controls.gamePrice.setValue(this.game.gamePrice);
      this.updateGameForm.controls.gameDeveloper.setValue(this.game.gameDeveloper);
      this.updateGameForm.controls.gamePublisher.setValue(this.game.gamePublisher);
      this.updateGameForm.controls.gameAdult.setValue(this.game.gameAdult);
      this.updateGameForm.controls.gameSystemRequirement.setValue(this.game.gameSystemRequirement);
    });
  }

  onSlideshowChange(target: EventTarget | null): void {
    const input = (target as HTMLInputElement);
    const files = input.files;
    const slideshow = [];
    const len = files?.length ?? 0;
    for (let i = 0; i < len; i++) {
      slideshow.push(files?.item(i));
    }
    this.updateGameForm.controls.gameSlideshow.setValue(slideshow);
  }

  onBannerChange(target: EventTarget | null): void {
    const input = (target as HTMLInputElement);
    const file = input.files;
    this.updateGameForm.controls.gameBanner.setValue(file?.item(0));
  }

  onUpdate(): void {
    if (this.updateGameForm.invalid) {
      return;
    }
    this.apollo.mutate({
      mutation: gql`mutation updateGame(
        $id: ID!
        $gameTitle: String!
        $gameDescription: String!
        $gameDeveloper: String!
        $gamePublisher: String!
        $gameTag: String!
        $gameAdult: Boolean!
        $gamePrice: Int!,
        $gameSystemRequirement: String!
        $gameBanner: Upload
        $gameSlideshow: [Upload]
      ) {
        updateGame(
          input: {
            id: $id
            gameTitle: $gameTitle
            gameDescription: $gameDescription
            gameDeveloper: $gameDeveloper
            gamePublisher: $gamePublisher
            gameTag: $gameTag
            gamePrice: $gamePrice
            gameAdult: $gameAdult
            gameSystemRequirement: $gameSystemRequirement
            gameBanner: $gameBanner
            gameSlideshow: $gameSlideshow
          }
        ) {
          id
        }
      }`, variables: {id: this.game.id, ...this.updateGameForm.value}
    }).subscribe();
  }
}
