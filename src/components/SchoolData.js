import moment from 'moment';

let api_key = null;
const format_date = 'YYYYMMDD';

async function get_api_key() {
    if (api_key === null) {
        const res = await fetch('/open_api_key');
        api_key = await res.text();
    }
    return api_key;
}

async function get_meal_data() {
    const today = moment();
    const today_YMD = today.format(format_date);

    const res = await fetch(
        `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${await get_api_key()}&ATPT_OFCDC_SC_CODE=D10&SD_SCHUL_CODE=7240393&MLSV_FROM_YMD=${today_YMD}&Type=json`
    );
    const data = await res.json();

    function filterMeal(row) {
        if (row.MLSV_YMD > today_YMD) return true;
        else if (row.MLSV_YMD < today_YMD) return false;
        else {
            if (row.MMEAL_SC_NM === '조식') return today.hours() <= 8;
            else if (row.MMEAL_SC_NM === '중식') return today.hours() <= 13;
            else if (row.MMEAL_SC_NM === '석식') return today.hours() <= 19;
        }
    }

    function transformMealText(meal_text) {
        for (let k = 19; k > 0; --k) {
            meal_text = meal_text.replace(`${k}.`, '');
        }
        return meal_text.replace(/<br\/>/g, '\n');
    }

    const mealInfo = [];
    data.mealServiceDietInfo[1].row.forEach((row) => {
        if (!filterMeal(row)) return;
        const meal_date = moment(row.MLSV_YMD, 'YYYYMMDD');
        let meal_title = 'undefined';

        meal_title = row.MMEAL_SC_NM;
        if (row.MLSV_YMD !== today_YMD) meal_title = `${meal_date.format('YYYY/MM/DD')} ${row.MMEAL_SC_NM}`;
        mealInfo.push({
            menu: transformMealText(row.DDISH_NM),
            title: meal_title,
            idx: Number(row.MLSV_YMD + row.MMEAL_SC_CODE),
        });
    });
    mealInfo.sort((a, b) => a.idx - b.idx);

    return mealInfo;
}

async function get_days_with_meal_in_range(start, end) {
    const res = await fetch(
        `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=D10&SD_SCHUL_CODE=7240393&Type=json&pSize=300&KEY=${await get_api_key()}&MLSV_FROM_YMD=${start.format(
            format_date
        )}&MLSV_TO_YMD=${end.format(format_date)}`
    );
    const data = await res.json();

    let days_with_meal = {};

    data.mealServiceDietInfo[1].row.forEach((row) => {
        days_with_meal[row.MLSV_YMD] = 1;
    });

    return Object.keys(days_with_meal);
}

async function get_inject_and_eject_date() {
    const today = moment();
    const today_YMD = today.format(format_date);
    const begin_range = moment().subtract(1, 'months');
    const end_range = moment().add(1, 'months');

    const get_days_with_meal = await get_days_with_meal_in_range(begin_range, end_range);
    if (get_days_with_meal.indexOf(today_YMD) === -1) {
        return null;
    }

    let inject_date = moment();
    inject_date.set('hours', 20).set('minutes', 0).set('seconds', 0).set('milliseconds', '0');
    let inject_date_YMD = inject_date.format(format_date);
    let eject_date = moment();
    eject_date.set('hours', 14).set('minutes', 0).set('seconds', 0).set('milliseconds', '0');
    let eject_date_YMD = eject_date.format(format_date);

    while (get_days_with_meal.indexOf(inject_date_YMD) !== -1) {
        inject_date.subtract(1, 'days');
        inject_date_YMD = inject_date.format(format_date);
    }
    while (get_days_with_meal.indexOf(eject_date_YMD) !== -1) {
        eject_date.add(1, 'days');
        eject_date_YMD = eject_date.format(format_date);
    }
    eject_date.subtract(1, 'days');

    return [inject_date, eject_date];
}

export { get_meal_data, get_inject_and_eject_date };
