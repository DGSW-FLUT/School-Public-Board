import React, { Component } from 'react';
import * as S from './PercentageGauage.style';
import moment, { now } from 'moment';

function inject_date() {
  return moment([2020, 9 - 1, 13, 18, 30]);
}
function eject_date() {
  return moment([2020, 9 - 1, 29, 18, 30]);
}

function FormatFF_FF(number) {
  return Math.round(number * 10000) / 100 + '%';
}

class PercentageGauage extends Component {
  render() {
    const fulltime = eject_date() - inject_date();
    const nowtime = this.props.nowDate - inject_date();
    //console.log(nowtime);
    return (
      <>
        <S.Content>
          {nowtime < fulltime
            ? eject_date()
                .subtract(this.props.nowDate)
                .format('집까지 D일 H시간 m분 s초')
                .toString()
            : '집 갈 시간입니다!'}
        </S.Content>
        <S.Bar>
          <S.OutterBar>
            <S.InnerBar style={{ width: `${(nowtime / fulltime) * 100}%` }} />
          </S.OutterBar>
          <S.BarText>{FormatFF_FF(nowtime / fulltime)}</S.BarText>
        </S.Bar>
      </>
    );
  }
}

export { PercentageGauage };

/*
const TABLE = require('./TimeTable.json');

function eject_date()
{
  const now_date = new Date();
  const now_year = now_date.getFullYear();
  const now_month = now_date.getMonth();
  const now_day = now_date.getDay();

  const date_list = [];

  for (let k = 1; k < TABLE.length; ++k) {
    const date_str = TABLE[k].ALL_TI_YMD;
    const date_year = Number(date_str.substr(0, 4));
    const date_month = Number(date_str.substr(4, 2));
    const date_day = Number(date_str.substr(6, 2));

    if (
      date_year > now_year ||
      (date_year === now_year && date_month > now_month) ||
      (date_year === now_year && date_month === now_month && date_day > now_day)
    ) {
      if (date_list.find((e) => e === date_str) === undefined)
        date_list.push(date_str);
    }
  }
  date_list.sort();
  console.log(date_list);
  const eject_date = new Date();
  while (true) {
    if (
      date_list.findIndex((e) => e === get_date_str(eject_date)) !== -1 ||
      eject_date.getDay() === 0
    ) {
      eject_date.setDate(eject_date.getDate() + 1);
    } else break;
  }
  console.log(eject_date);
}
*/
