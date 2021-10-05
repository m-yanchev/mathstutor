import {dbAPI} from "../dynamoDBAPI";

describe("getItem", () => {

    test("Получить курс", async () => {

        const {getItem} = dbAPI
        const id = 1
        const key = {id: {N: String(id)}}
        const item = await getItem("courses", key)
        const result = {S: "Подготовка к ЕГЭ профильного уровня. 10 - 11 класс. Начальный уровень: средний. 140 часов."}
        await expect(item.title).toEqual(result)
    })
})

describe("getItems", () => {

    test("Получить список из 2-х результатов", async () => {

        const {getItems} = dbAPI
        const testId = 1
        const userId = "6148e012088bd4488dc3d6bf"
        const filter = {
            expression: "testId = :testId and userId = :userId",
            values: {":testId": {N: String(testId)}, ":userId": {S: userId}}
        }
        const items = await getItems("testResults", filter)
        const result = [{
            percent: {N: "80"},
            timeStamp: {N: "1633089600"},
            testId: {N: "1"},
            userId: {S: "6148e012088bd4488dc3d6bf"}
        }, {
            percent: {N: "70"},
            timeStamp: {N: "1633176000"},
            testId: {N: "1"},
            userId: {S: "6148e012088bd4488dc3d6bf"}
        }]
        await expect(items).toEqual(result)
    })

    test("Получить список из 1-ого результата для n.yanchev@yandex.ru", async () => {

        const {getItems} = dbAPI
        const testId = 2
        const userId = "6148e012088bd4488dc3d6bf"
        const filter = {
            expression: "testId = :testId and userId = :userId",
            values: {":testId": {N: String(testId)}, ":userId": {S: userId}}
        }
        const items = await getItems("testResults", filter)
        const result = [{
            percent: {N: "60"},
            timeStamp: {N: "1633262400"},
            testId: {N: "2"},
            userId: {S: "6148e012088bd4488dc3d6bf"}
        }]
        await expect(items).toEqual(result)
    })

    test("Получить список из 1-ого результата для nu.yanchev@gmail.com", async () => {

        const {getItems} = dbAPI
        const testId = 1
        const userId = "6130afa3fb7b31651e50e48f"
        const filter = {
            expression: "testId = :testId and userId = :userId",
            values: {":testId": {N: String(testId)}, ":userId": {S: userId}}
        }
        const items = await getItems("testResults", filter)
        const result = [{
            percent: {N: "50"},
            timeStamp: {N: "1633262400"},
            testId: {N: "1"},
            userId: {S: "6130afa3fb7b31651e50e48f"}
        }]
        await expect(items).toEqual(result)
    })
})