import { Component, OnInit } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { map, Observable, of, switchMap, take, timer } from "rxjs";
import { OpenAiService } from "./open-ai.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "dju";
  vibeText = new UntypedFormControl("");
  constructor(private ai: OpenAiService) {}
  sugg: any;
  exampleReqs = [
    "I am djing a wedding for a young couple",
    "Im having a 1920's board game night",
    "Im in the gym for a rigorous workout",
  ];
  placeholder$: Observable<string> | undefined;
  interval$: Observable<number> = timer(0, 1000);
  ngOnInit(): void {
    this.placeholder$ = this.interval$.pipe(
      switchMap((index) =>
        of(this.exampleReqs[index % this.exampleReqs.length]),
      ),
    );
  }
  getSuggestions() {
    const data = { text: this.vibeText.value };
    console.log("data", data);
    this.ai.fetchData(data).subscribe((res: any) => {
      console.log("response", res);
      this.sugg = res.message.content;
    });
  }
}
