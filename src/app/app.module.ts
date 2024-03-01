import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { NavAuthComponent } from './components/nav-auth/nav-auth.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgToastModule } from 'ng-angular-popup';
import { SearchPipe } from './shared/search.pipe';
import { ProductshomeComponent } from './components/productshome/productshome.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MyhttpInterceptor } from './shared/interceptors/myhttp.interceptor';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { PaymentComponent } from './components/payment/payment.component';
import { ForgetpasswordComponent } from './components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    BrandsComponent,
    CategoriesComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent,
    DetailsComponent,
    NavBlankComponent,
    NavAuthComponent,
    AuthLayoutComponent,
    BlankLayoutComponent,
    SearchPipe,
    ProductshomeComponent,
    PaymentComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    FormsModule,
    NgToastModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      progressBar: true,
    }),
    NgxSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyhttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
