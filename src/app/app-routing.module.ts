import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {logging} from 'protractor';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginAdminComponent} from './pages/login-admin/login-admin.component';
import {ManageGameComponent} from './pages/manage-game/manage-game.component';
import {UpdateGameComponent} from './pages/update-game/update-game.component';
import {AdminComponent} from './pages/admin/admin.component';
import {ManageGameHomeComponent} from './pages/manage-game-home/manage-game-home.component';
import {InsertGamePromoComponent} from './pages/insert-game-promo/insert-game-promo.component';
import {UpdateGamePromoComponent} from './pages/update-game-promo/update-game-promo.component';
import {ManagePromoComponent} from './pages/manage-promo/manage-promo.component';
import {PointsShopComponent} from './pages/points-shop/points-shop.component';
import {CommunityComponent} from './pages/community/community.component';
import {CommunityDetailComponent} from './pages/community-detail/community-detail.component';
import {ReviewDetailComponent} from './pages/review-detail/review-detail.component';
import {DiscussionDetailComponent} from './pages/discussion-detail/discussion-detail.component';
import {extractDirectiveTypeCheckMeta} from '@angular/compiler-cli/src/ngtsc/metadata';
import {EditProfileComponent} from './pages/edit-profile/edit-profile.component';
import {EditAvatarComponent} from './pages/edit-avatar/edit-avatar.component';
import {EditThemeComponent} from './pages/edit-theme/edit-theme.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {EditFrameComponent} from './pages/edit-frame/edit-frame.component';
import {TopUpWalletComponent} from './pages/top-up-wallet/top-up-wallet.component';
import {EditProfileBackgroundComponent} from './pages/edit-profile-background/edit-profile-background.component';
import {EditBadgeComponent} from './pages/edit-badge/edit-badge.component';
import {EditMiniProfileComponent} from './pages/edit-mini-profile/edit-mini-profile.component';
import {MarketComponent} from './pages/market/market.component';
import {MarketDetailComponent} from './pages/market-detail/market-detail.component';
import {ManageUserComponent} from './pages/manage-user/manage-user.component';
import {AddImgvidComponent} from './pages/add-imgvid/add-imgvid.component';
import {AddReviewComponent} from './pages/add-review/add-review.component';
import {EditProfileHomeComponent} from './pages/edit-profile-home/edit-profile-home.component';
import {ChatRoomComponent} from './pages/chat-room/chat-room.component';
import {ChatHomeComponent} from './pages/chat-home/chat-home.component';
import {BadgePageComponent} from './pages/badge-page/badge-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin/login',
    component: LoginAdminComponent
  },
  {
    path: 'admin/insert/game',
    component: ManageGameComponent
  },
  {
    path: 'admin/update/game/:id',
    component: UpdateGameComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin/manage/game',
    component: ManageGameHomeComponent
  },
  {
    path: 'admin/insert/promo/:id',
    component: InsertGamePromoComponent
  },
  {
    path: 'admin/update/promo/:id',
    component: UpdateGamePromoComponent
  },
  {
    path: 'admin/manage/promo',
    component: ManagePromoComponent
  },
  {
    path: 'points/shop',
    component: PointsShopComponent
  },
  {
    path: 'community',
    component: CommunityComponent
  },
  {
    path: 'community/:id',
    component: CommunityDetailComponent
  },
  {
    path: 'community/review/:id',
    component: ReviewDetailComponent
  },
  {
    path: 'discussion/detail/:id',
    component: DiscussionDetailComponent
  },
  {
    path: 'edit/profile',
    component: EditProfileComponent
  },
  {
    path: 'edit/avatar',
    component: EditAvatarComponent
  },
  {
    path: 'edit/theme',
    component: EditThemeComponent
  },
  {
    path: 'profile/:customURL',
    component: ProfileComponent
  },
  {
    path: 'edit/frame',
    component: EditFrameComponent
  },
  {
    path: 'top-up/wallet',
    component: TopUpWalletComponent
  },
  {
    path: 'edit/background',
    component: EditProfileBackgroundComponent
  },
  {
    path: 'edit/badge',
    component: EditBadgeComponent
  },
  {
    path: 'edit/mini',
    component: EditMiniProfileComponent
  },
  {
    path: 'market',
    component: MarketComponent
  },
  {
    path: 'market/detail/:id',
    component: MarketDetailComponent
  },
  {
    path: 'admin/manage/user',
    component: ManageUserComponent
  },
  {
    path: 'add/form',
    component: AddImgvidComponent
  },
  {
    path: 'add/review',
    component: AddReviewComponent
  },
  {
    path: 'edit/profile/home',
    component: EditProfileHomeComponent
  },
  {
    path: 'chat/room/:id',
    component: ChatRoomComponent
  },
  {
    path: 'chat/home',
    component: ChatHomeComponent
  },
  {
    path: 'badge/page',
    component: BadgePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
