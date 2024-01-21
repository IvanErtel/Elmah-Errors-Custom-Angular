import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { MaterialComponentsModule } from "./shared/modules/material-component.module";
import { GrillaComponent } from "./component/grilla/grilla/grilla.component";
import { HttpClientModule } from '@angular/common/http';
import { DetalleDialogsComponent } from './component/dialog/detalle-dialogs/detalle-dialogs.component';;
import { SearchComponent } from "./component/search/search.component";
import { SkeletonComponent } from './component/skeleton/skeleton.component';
import { MatSelectModule } from "@angular/material/select";
@NgModule({
  declarations: [
    AppComponent,
    GrillaComponent,
    DetalleDialogsComponent,
    SearchComponent,
    SkeletonComponent,
  ],
  imports: [
    MaterialComponentsModule,
    HttpClientModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
