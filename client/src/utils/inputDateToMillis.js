import { DateTime } from 'luxon';

const inputDateToMillis = (date) => DateTime.fromFormat(date, 'yyyy-MM-dd').toMillis();

export default inputDateToMillis;
