import {Component, Input, OnInit, SimpleChanges, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-countdown-timer-alias',
  templateUrl: './countdown-timer-alias.component.html',
  styleUrls: ['./countdown-timer-alias.component.css']
})
export class CountdownTimerAliasComponent implements OnInit {

  private intervalId = 0;
  message = '';
  remainingTime: number;
  @Input('remaining-time')
  seconds = 11;
  ngOnChanges(changes: SimpleChanges) {
    if ('seconds' in changes) {
      let v = changes.seconds.currentValue;
      v = typeof v === 'undefined' ? 11 : v;
      const vFixed = Number(v);
      this.seconds = Number.isNaN(vFixed) ? 11 : vFixed;
    }
  }
  clearTimer() {
    clearInterval(this.intervalId);
  }
  constructor() { }

  ngOnInit(): void {
    this.reset();
    this.start();
  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.clearTimer();
  }
  reset() {
    this.clearTimer();
    this.remainingTime = this.seconds;
    this.message = 'Click start button to start to CountDown'
  }
  start() {
    this.countdown();
    if(this.remainingTime<=0){
      this.remainingTime = this.seconds;
    }
  }
  stop() {
   this.clearTimer();
   this.message = `Holding at T - ${this.remainingTime} seconds`;

  }
  private countdown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.remainingTime -=1;
      if(this.remainingTime==0){
        this.message = 'Blass off!';
        this.clearTimer();
      } else {
        this.message = `T-${this.remainingTime} senconds and counting`
      }

    },1000);
  }

}
