import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './pages/home/home.component';
import {FooterComponent} from './components/footer/footer.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SearchbarComponent} from './components/searchbar/searchbar.component';
import {LoginAdminComponent} from './pages/login-admin/login-admin.component';
import {ManageGameComponent} from './pages/manage-game/manage-game.component';
import {UpdateGameComponent} from './pages/update-game/update-game.component';
import {AdminComponent} from './pages/admin/admin.component';
import {AdminNavbarComponent} from './components/admin-navbar/admin-navbar.component';
import {ManageGameHomeComponent} from './pages/manage-game-home/manage-game-home.component';
import {SquareComponent} from './components/square/square.component';
import {InsertGamePromoComponent} from './pages/insert-game-promo/insert-game-promo.component';
import {UpdateGamePromoComponent} from './pages/update-game-promo/update-game-promo.component';
import {ManagePromoComponent} from './pages/manage-promo/manage-promo.component';
import {PointsShopComponent} from './pages/points-shop/points-shop.component';
import {PointsShopNavbarComponent} from './components/points-shop-navbar/points-shop-navbar.component';
import {CommunityComponent} from './pages/community/community.component';
import {TabsComponent} from './components/tabs/tabs.component';
import {TabComponent} from './components/tab/tab.component';
import {ImageVideoComponent} from './components/image-video/image-video.component';
import {ReviewComponent} from './components/review/review.component';
import {DiscussionComponent} from './components/discussion/discussion.component';
import {CommunityDetailComponent} from './pages/community-detail/community-detail.component';
import {ReviewDetailComponent} from './pages/review-detail/review-detail.component';
import {DiscussionDetailComponent} from './pages/discussion-detail/discussion-detail.component';
import {SidebarEditProfileComponent} from './components/sidebar-edit-profile/sidebar-edit-profile.component';
import {EditProfileComponent} from './pages/edit-profile/edit-profile.component';
import {EditAvatarComponent} from './pages/edit-avatar/edit-avatar.component';
import {EditProfileBackgroundComponent} from './pages/edit-profile-background/edit-profile-background.component';
import {EditThemeComponent} from './pages/edit-theme/edit-theme.component';
import {EditBadgeComponent} from './pages/edit-badge/edit-badge.component';
import {EditMiniProfileComponent} from './pages/edit-mini-profile/edit-mini-profile.component';
import {RecaptchaModule} from 'ng-recaptcha';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditFrameComponent } from './pages/edit-frame/edit-frame.component';
import { TopUpWalletComponent } from './pages/top-up-wallet/top-up-wallet.component';
import { MarketComponent } from './pages/market/market.component';
import { MarketDetailComponent } from './pages/market-detail/market-detail.component';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { AddImgvidComponent } from './pages/add-imgvid/add-imgvid.component';
import { AddReviewComponent } from './pages/add-review/add-review.component';
import { EditProfileHomeComponent } from './pages/edit-profile-home/edit-profile-home.component';
import {ChartsModule} from 'ng2-charts';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GameDetailComponent } from './pages/game-detail/game-detail.component';
import { ChatHomeComponent } from './pages/chat-home/chat-home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FooterComponent,
    SidebarComponent,
    SearchbarComponent,
    LoginAdminComponent,
    ManageGameComponent,
    UpdateGameComponent,
    AdminComponent,
    AdminNavbarComponent,
    ManageGameHomeComponent,
    SquareComponent,
    InsertGamePromoComponent,
    UpdateGamePromoComponent,
    ManagePromoComponent,
    PointsShopComponent,
    PointsShopNavbarComponent,
    CommunityComponent,
    TabsComponent,
    TabComponent,
    ImageVideoComponent,
    ReviewComponent,
    DiscussionComponent,
    CommunityDetailComponent,
    ReviewDetailComponent,
    DiscussionDetailComponent,
    SidebarEditProfileComponent,
    EditProfileComponent,
    EditAvatarComponent,
    EditProfileBackgroundComponent,
    EditThemeComponent,
    EditBadgeComponent,
    EditMiniProfileComponent,
    ProfileComponent,
    EditFrameComponent,
    TopUpWalletComponent,
    MarketComponent,
    MarketDetailComponent,
    ManageUserComponent,
    AddImgvidComponent,
    AddReviewComponent,
    EditProfileHomeComponent,
    GameDetailComponent,
    ChatHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaModule,
    ChartsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
