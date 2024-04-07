import { Component, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { map, Observable, of, switchMap, take, timer } from "rxjs";
import { OpenAiService } from "./open-ai.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {}
