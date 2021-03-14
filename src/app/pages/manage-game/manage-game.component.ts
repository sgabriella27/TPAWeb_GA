import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Apollo, gql} from 'apollo-angular';
import {variable} from '@angular/compiler/src/output/output_ast';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-manage-game',
  templateUrl: './manage-game.component.html',
  styleUrls: ['./manage-game.component.scss']
})
export class ManageGameComponent implements OnInit {

  createGameForm = this.fb.group({
    gameTitle: ['', Validators.required],
    gameDescription: ['', Validators.required],
    gamePrice: [0, Validators.required],
    gamePublisher: ['', Validators.required],
    gameDeveloper: ['', Validators.required],
    gameTag: ['', Validators.required],
    gameSystemRequirement: ['', Validators.required],
    gameAdult: [false, Validators.required],
    gameBanner: ['', Validators.required],
    gameSlideshow: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private apollo: Apollo, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

  }

  onSlideshowChange(target: EventTarget | null): void {
    const input = (target as HTMLInputElement);
    const files = input.files;
    const slideshow = [];
    const len = files?.length ?? 0;
    for (let i = 0; i < len; i++) {
      slideshow.push(files?.item(i));
    }
    this.createGameForm.controls.gameSlideshow.setValue(slideshow);
  }

  onBannerChange(target: EventTarget | null): void {
    const input = (target as HTMLInputElement);
    const file = input.files;
    this.createGameForm.controls.gameBanner.setValue(file?.item(0));
  }

  onSubmit(): void {
    if (this.createGameForm.invalid) {
      return;
    }
    this.apollo.mutate({
      mutation: gql`mutation createGame($gameTitle: String!, $gameDescription: String!, $gamePrice: Int!, $gamePublisher: String!, $gameDeveloper: String!,
        $gameTag: String!, $gameAdult: Boolean!, $gameBanner: Upload!, $gameSlideshow: [Upload!]!, $gameSystemRequirement: String!) {
        createGame(input: {
          gameTitle: $gameTitle,
          gameDescription: $gameDescription,
          gamePrice: $gamePrice,
          gamePublisher: $gamePublisher,
          gameDeveloper: $gameDeveloper,
          gameTag: $gameTag,
          gameAdult: $gameAdult,
          gameBanner: $gameBanner,
          gameSlideshow: $gameSlideshow,
          gameSystemRequirement: $gameSystemRequirement
        }) {
          id
        }
      }`, variables: {
        gameTitle: this.createGameForm.value.gameTitle,
        gameDescription: this.createGameForm.value.gameDescription,
        gamePrice: this.createGameForm.value.gamePrice,
        gamePublisher: this.createGameForm.value.gamePublisher,
        gameDeveloper: this.createGameForm.value.gameDeveloper,
        gameTag: this.createGameForm.value.gameTag,
        gameAdult: this.createGameForm.value.gameAdult,
        gameSystemRequirement: this.createGameForm.value.gameSystemRequirement,
        gameBanner: this.createGameForm.value.gameBanner,
        gameSlideshow: this.createGameForm.value.gameSlideshow
      }
    }).subscribe(resp => {
      console.log(resp);
      alert('Add Game Success!');
      window.location.reload();
    });
  }
}
