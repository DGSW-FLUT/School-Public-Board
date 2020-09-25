import React, { useEffect, useState } from 'react';
import logo from './logo.svg';

import { PercentageGauage } from './components/PercentageGauage';
import { MealView } from './components/MealView';
import * as S from './App.style';

import moment from 'moment';

function App() {
  const [nowDate, set_nowDate] = useState(moment());
  useEffect(() => {
    let interval = null;
    interval = setInterval(() => set_nowDate(moment()), 500);
  });
  return (
    <S.Container className='App'>
      <S.Title>{nowDate.format('ddd YYYY.M.D').toString()}</S.Title>
      <PercentageGauage nowDate={nowDate} />
      <MealView />
    </S.Container>
  );
}

export default App;
