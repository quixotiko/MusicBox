import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeTransform'
})
export class TimeTransformPipe implements PipeTransform {

  transform(value: number): string {
    let temp = Math.floor((value / 1000));
    let seconds = temp % 60;
    let minutes = (temp - seconds) / 60;
    let secondsText = `${seconds}`;
    let minutesText = `${minutes}`;
    if(seconds < 10)
    {
      secondsText = `0${seconds}`;
    }
    if(minutes < 10)
    {
      minutesText = `0${minutes}`;
    }
    return `${minutesText}:${secondsText}`;
  }

}
