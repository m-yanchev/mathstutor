import TimeDate from '../TimeDate';

describe("offset", () => {

    test('Сдвиг времени с пустым объектом опций', () => {
        const timeDate = new TimeDate(1631723400000) // 15 сентября 2021, 19:30
        expect(timeDate.offset({}).date.valueOf()).toBe(1631723400000);
    });

    test('Сдвиг времени на -90 минут', () => {
        const timeDate = new TimeDate(1631723400000) // 15 сентября 2021, 19:30
        expect(timeDate.offset({minute: -90}).date.valueOf()).
        toBe(1631718000000); // 15 сентября 2021, 18:00
    });

    test('Сдвиг времени на 60 минут', () => {
        const timeDate = new TimeDate(1631723400000) // 15 сентября 2021, 19:30
        expect(timeDate.offset({minute: 60}).date.valueOf()).
        toBe(	1631727000000); // 15 сентября 2021, 20:30
    });

    test('Сдвиг времени на 7 недель', () => {
        const timeDate = new TimeDate(1631723400000) // 15 сентября 2021, 19:30
        expect(timeDate.offset({week: 7}).date.valueOf()).
        toBe(1635957000000); // 3 ноября 2021, 19:30
    });

    test('Сдвиг времени на 3 дня 18 часов 00 минут', () => {
        const timeDate = new TimeDate(1631394000000) // 12 сентября 2021, 00:00
        expect(timeDate.offset({day: 3, hour: 18, minute: 0}).date.valueOf()).
        toBe(1631718000000); // 15 сентября 2021, 18:00
    });
})

describe("offsetFromBeginning", () => {

    test("Сдвиг времени с пустым объектом опций", () => {
        const timeDate = new TimeDate(1631723400000) // 15 сентября 2021, 19:30
        expect(timeDate.offsetFromBeginning("week", {}).date.valueOf()).
        toBe(1631394000000); // 12 сентября 2021, 00:00
    })

    test('Сдвиг времени на 2 дня 17 часов 15 минут', () => {
        const timeDate = new TimeDate(1631723400000) // 15 сентября 2021, 19:30
        expect(timeDate.offsetFromBeginning("week", {day: 2, hour: 17, minute: 15}).date.valueOf()).
        toBe(1631628900000); // 14 сентября 2021, 17:15
    })
})

describe("format", () => {

    test('Должен вернуть "01.02"', () => {
        const timeDate = new TimeDate(1643731936454) // 01 февраля 2022
        expect(timeDate.format("day.month")).toBe("01.02")
    })

    test('Должен вернуть "23.10"', () => {
        const timeDate = new TimeDate(1635005536903) // 23 октября 2021
        expect(timeDate.format("day.month")).toBe("23.10")
    })

    test('Должен вернуть "00:20"', () => {
        const timeDate = new TimeDate(1634937616023) // 23 октября 2021, 00:20
        expect(timeDate.format("hour:minute")).toBe("00:20")
    })

    test('Должен вернуть "21:04"', () => {
        const timeDate = new TimeDate(1635012256023) // 23 октября 2021, 21:04
        expect(timeDate.format("hour:minute")).toBe("21:04")
    })
})

describe("weekDay", () => {

    test('Должен вернуть 2', () => {
        const timeDate = new TimeDate(1643731936454) // 01 февраля 2022
        expect(timeDate.weekDay).toBe(2)
    })

    test('Должен вернуть 6', () => {
        const timeDate = new TimeDate(1635005536903) // 23 октября 2021
        expect(timeDate.weekDay).toBe(6)
    })
})

describe("dayCountTo", () => {

    test('Должен вернуть 102', () => {
        const firstDate = new TimeDate(1635005536903) // 23 октября 2021
        const lastDate = new TimeDate(1643731936454) // 01 февраля 2022
        expect(firstDate.dayCountTo(lastDate)).toBe(102)
    })
})