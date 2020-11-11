import React, { Component } from 'react';

import { PercentageGauage } from './components/PercentageGauage';
import { MealView } from './components/MealView';
import * as S from './App.style';
import { get_inject_and_eject_date } from './components/SchoolData';

import moment from 'moment';

class App extends Component {
    interval_for_time = null;
    interval_for_inject_and_eject_time = null;

    constructor(props) {
        super(props);
        this.state = {
            nowDate: moment(),
            inject_and_eject_date: null,
        };
    }

    componentDidMount() {
        this.interval_for_time = setInterval(() => {
            this.setState({ nowDate: moment() });
        }, 500);
        this.interval_for_inject_and_eject_time = setInterval(async () => {
            this.setState({ inject_and_eject_date: await get_inject_and_eject_date() });
        }, 3600 * 1000);
        (async () => this.setState({ inject_and_eject_date: await get_inject_and_eject_date() }))();
    }

    componentWillUnmount() {
        clearInterval(this.interval_for_time);
        clearInterval(this.interval_for_inject_and_eject_time);
    }

    render() {
        let inject_date_str = undefined;
        let eject_date_str = undefined;
        const in_domitory_range = this.state.inject_and_eject_date !== null;
        if (in_domitory_range) {
            console.log(this.state.inject_and_eject_date);
            inject_date_str = this.state.inject_and_eject_date[0].format('ddd YYYY.M.D').toString();
            eject_date_str = this.state.inject_and_eject_date[1].format('ddd YYYY.M.D').toString();
        }

        return (
            <S.Container className='App'>
                <S.Title>{this.state.nowDate.format('ddd YYYY.M.D').toString()}</S.Title>
                {in_domitory_range ? <S.Subtitle>{`${inject_date_str} ~ ${eject_date_str}`}</S.Subtitle> : undefined}
                <PercentageGauage
                    nowDate={this.state.nowDate}
                    in_domitory_range={in_domitory_range}
                    inject_date={in_domitory_range ? this.state.inject_and_eject_date[0] : null}
                    eject_date={in_domitory_range ? this.state.inject_and_eject_date[1] : null}
                />
                <MealView />
            </S.Container>
        );
    }
}

export default App;
