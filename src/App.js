import React, { useEffect, useState } from 'react';

import { PercentageGauage } from './components/PercentageGauage';
import { MealView } from './components/MealView';
import * as S from './App.style';
import { inject_date, eject_date } from './components/TimeTable';

import moment from 'moment';

function App() {
  const [nowDate, set_nowDate] = useState(moment());
  useEffect(() => {
    setInterval(() => {
      set_nowDate(moment());
    }, 500);
  });
  const inject_date_str = inject_date.format('ddd YYYY.M.D').toString();
  const eject_date_str = eject_date.format('ddd YYYY.M.D').toString();

  return (
    <S.Container className='App'>
      <S.Title>{nowDate.format('ddd YYYY.M.D').toString()}</S.Title>
      <S.Subtitle>{`${inject_date_str} ~ ${eject_date_str}`}</S.Subtitle>
      <PercentageGauage nowDate={nowDate} />
      <MealView />
    </S.Container>
  );
}

export default App;
