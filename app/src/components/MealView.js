import React, { Component } from 'react';
import * as S from './MealView.style';

const raw_api_link =
  'https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=D10&SD_SCHUL_CODE=7240393&MLSV_FROM_YMD=20200925&Type=json';
let api_link = null;

function get_date_str(date) {
  return date.toISOString().substr(0, 10).replace(/-/g, '');
}

function IsPastMeal(row) {
  const now = new Date();
  const now_date_str = get_date_str(now);
  if (row.MLSV_YMD > now_date_str) return false;
  else if (row.MLSV_YMD < now_date_str) return true;
  else {
    if (row.MMEAL_SC_NM === '조식') return now.getHours() >= 8;
    else if (row.MMEAL_SC_NM === '중식') return now.getHours() >= 13;
    else if (row.MMEAL_SC_NM === '석식') return now.getHours() >= 19;
  }
}

function filterMeal(meal_text) {
  for (let k = 19; k > 0; --k) {
    meal_text = meal_text.replace(`${k}.`, '');
  }
  return meal_text.replace(/<br\/>/g, '\n');
}

class MealView extends Component {
  interval = null;
  constructor(props) {
    super(props);
    this.state = {
      mealInfo: [],
    };
  }

  async update() {
    const res = await fetch(api_link);
    const data = await res.json();
    const now_date_str = get_date_str(new Date());

    const mealInfo = [];
    data.mealServiceDietInfo[1].row.forEach((row) => {
      if (IsPastMeal(row)) return;
      let meal_title = 'undefined';
      if (row.MLSV_YMD === now_date_str) meal_title = row.MMEAL_SC_NM;
      else
        meal_title =
          `${row.MLSV_YMD.substr(0, 4)}/` +
          `${row.MLSV_YMD.substr(4, 2)}/` +
          `${row.MLSV_YMD.substr(6, 2)} ${row.MMEAL_SC_NM}`;
      mealInfo.push({
        menu: filterMeal(row.DDISH_NM),
        title: meal_title,
        idx: Number(row.MLSV_YMD + row.MMEAL_SC_CODE),
      });
    });
    mealInfo.sort((a, b) => a.idx - b.idx);
    this.setState({ mealInfo: mealInfo.slice(0, 3) });
  }

  async setApiLink() {
    const res = await fetch('/open_api_key');
    const api_key = await res.text();
    api_link = raw_api_link + '&KEY=' + api_key;
  }

  componentDidMount() {
    this.setApiLink().then(() => {
      this.update();

      //this.interval = setInterval(ths.update, 600000);
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const mealList = this.state.mealInfo.map((meal, idx) => {
      return (
        <S.MealItemCont key={idx}>
          <S.MeealTitle>&lt; {meal.title} &gt;</S.MeealTitle>
          <S.MealContent>{meal.menu}</S.MealContent>
        </S.MealItemCont>
      );
    });
    return <div>{mealList}</div>;
  }
}
export { MealView };
