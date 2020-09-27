import React, { Component } from 'react';
import * as S from './PercentageGauage.style';
import { inject_date, eject_date } from './TimeTable';
import moment from 'moment';

function FormatFF_FF(number) {
  return Math.round(number * 10000) / 100 + '%';
}

function FormatTimeDifferance(diff_milliseconds) {
  let diff_seconds = Math.round(diff_milliseconds / 1000);
  const result = {
    day: null,
    hour: null,
    minute: null,
    second: null,
  };
  if (diff_seconds >= 3600 * 24) {
    result.day = Math.floor(diff_seconds / (3600 * 24));
    diff_seconds -= result.day * 3600 * 24;
  }
  if (diff_seconds >= 3600) {
    result.hour = Math.floor(diff_seconds / 3600);
    diff_seconds -= result.hour * 3600;
  }
  if (diff_seconds >= 60) {
    result.minute = Math.floor(diff_seconds / 60);
    diff_seconds -= result.minute * 60;
  }
  result.second = diff_seconds;

  let result_string = '';
  if (result.day !== null) result_string += `${result.day}일 `;
  if (result.hour !== null) result_string += `${result.hour}초 `;
  if (result.minute !== null) result_string += `${result.minute}분 `;
  result_string += `${result.second}초 `;
  return result_string;
}

class PercentageGauage extends Component {
  render() {
    const fulltime = eject_date - inject_date;
    const lefttime = eject_date - this.props.nowDate;
    const nowtime = this.props.nowDate - inject_date;
    return (
      <>
        <S.Content>
          {nowtime < fulltime
            ? `집까지 ${FormatTimeDifferance(lefttime)} 남았습니다.`
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
