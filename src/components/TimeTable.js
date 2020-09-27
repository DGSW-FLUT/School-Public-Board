import moment from 'moment';

const inject_date = moment.parseZone('2020-09-13T18:30:00+09:00');
const eject_date = moment.parseZone('2020-09-29T18:30:00+09:00');

export { inject_date, eject_date };
