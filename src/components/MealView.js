import React, { Component } from 'react';
import * as S from './MealView.style';
import { get_meal_data } from './SchoolData';

class MealView extends Component {
    interval = null;
    constructor(props) {
        super(props);
        this.state = {
            mealInfo: [],
        };
    }

    async update() {
        this.setState({ mealInfo: (await get_meal_data()).slice(0, 3) });
    }

    componentDidMount() {
        this.update();
        this.interval = setTimeout(async () => await this.update(), 60 * 1000);
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
