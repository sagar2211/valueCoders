import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswersComponent } from './components/answers/answers.component';
import { BuilderComponent } from './components/builder/builder.component';

const routes: Routes = [
  {path : '', redirectTo: 'builder', pathMatch: 'full'},
  {path : 'builder', component:BuilderComponent},
  {path : 'answers', component:AnswersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
