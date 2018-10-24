const csv_to_array = (data, delimiter = ',', omitFirstRow = false) =>
    data
        .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
        .split('\n')
        .map(v => v.split(delimiter));


const CSV_to_JSON = (data, delimiter = ',') => {
    const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
    return data
        .slice(data.indexOf('\n') + 1)
        .split('\n')
        .map(v => {
            const values = v.split(delimiter);
            return titles.reduce((obj, title, index) => ((obj[title] = values[index]), obj), {});
        });
};

const dateToTimestamp = (date) => {
    const dateReverse = date.split('/').reverse().join('/');

    getWeekday(new Date(dateReverse).getTime())
    return new Date(dateReverse).getTime() ? new Date(dateReverse).getTime() : '0';
};

const getWeekday = (date) => new Date(date).getUTCDay();

module.exports = {
    csv_to_array,
    CSV_to_JSON,
    dateToTimestamp,
    getWeekday
}