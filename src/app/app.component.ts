import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sleep Fit';
  weathers:any;
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    console.log('call axios');
    this.getWeathers();
  }

  getWeathers(): void {
    console.log('called');
    const token = '';
    this.http.get('https://api.openweathermap.org/data/2.5/forecast?q=sydney&appid=' + token)
      .toPromise()
      .then((res: any) => {
        if (res) {
          const todayDate = moment().format('DD/MM/YYYY');
          const list = _.map(res.list, (el) => {
            const currentDatetime = moment(el.dt_txt);
            const formattedDate = currentDatetime.format('DD/MM/YYYY');
            // const formattedDate = currentDatetime.getDate() +
            //   '-' +
            //   (currentDatetime.getMonth() + 1) +
            //   '-' +
            //   currentDatetime.getFullYear();
            console.log(formattedDate);
            return {
                ...el,
                date: formattedDate,
                today: formattedDate === todayDate
              };
            });
          console.log(list, _.groupBy(list, 'date'));
          this.weathers = _.map(_.groupBy(list, 'date'), (el, key) => {
            console.log(el, key);
            return {
              date: moment(key, 'DD/MM/YYYY').format('DD MMM YYYY (ddd)'),
              today: key === todayDate,
              values: el
            };
          });
          console.log(this.weathers);
        }
      });
  }
}
