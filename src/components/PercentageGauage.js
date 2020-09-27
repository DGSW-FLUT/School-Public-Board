import React, { Component } from 'react';
import * as S from './PercentageGauage.style';
import { inject_date, eject_date } from './TimeTable';
import moment from 'moment';

function FormatFF_FF(number) {
  return Math.round(number * 10000) / 100 + '%';
}

class PercentageGauage extends Component {
  render() {
    const fulltime = eject_date - inject_date;
    const lefttime = moment(eject_date).subtract(this.props.nowDate);
    const nowtime = this.props.nowDate - inject_date;
    return (
      <>
        <S.Content>
          {nowtime < fulltime
            ? lefttime.format('집까지 D일 H시간 m분 s초').toString()
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
