import {Component, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-countdown-timer-event-alias',
  templateUrl: './countdown-timer-event-alias.component.html',
  styleUrls: ['./countdown-timer-event-alias.component.css']
})
export class CountdownTimerEventAliasComponent implements OnInit {
  private intervalId = 0;
  message =  '';
  remainingTime: number;
  @Input() seconds = 11;

  @Output('timerEnd')
  finish = new EventEmitter<boolean>();
  ngOnChanges(changes: SimpleChanges) {
    if ('seconds' in changes) {
      let v = changes.seconds.currentValue;
      v = typeof  v === 'undefined' ? 11 : v;
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
  ngDestroy() {
    this.clearTimer();
  }
  reset() {
    this.clearTimer();
    this.remainingTime = this.seconds;
    this.message = 'Click Start button to start to CountDown';
  }
  start() {
    this.countDown();
    if (this.remainingTime<=0) {
      this.remainingTime = this.seconds;
    }
  }
  stop() {
    this.clearTimer();
    this.message = `Holding at T - ${this.remainingTime} seconds`;
  }
  countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.remainingTime -=1;
      if (this.remainingTime===0) {
        this.message = 'Blast off!';
        this.clearTimer();
        this.finish.emit(true);
      } else {
        this.message = `T - ${this.remainingTime} seconds and counting`;
      }
    },1000);

  }

}
