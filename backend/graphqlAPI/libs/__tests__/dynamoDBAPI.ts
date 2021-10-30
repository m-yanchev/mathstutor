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
            percentage: {N: "80"},
            msTimeStamp: {S: "1633089600123"},
            testId: {N: "1"},
            userId: {S: "6148e012088bd4488dc3d6bf"}
        }, {
            percentage: {N: "70"},
            msTimeStamp: {S: "1633176000456"},
            testId: {N: "1"},
            userId: {S: "6148e012088bd4488dc3d6bf"},
            finishedTimeStamp: {N: "1633178240"}
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
            percentage: {N: "60"},
            msTimeStamp: {S: "1633262400123"},
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
            percentage: {N: "50"},
            msTimeStamp: {S: "1633262400456"},
            testId: {N: "1"},
            userId: {S: "6130afa3fb7b31651e50e48f"}
        }]
        await expect(items).toEqual(result)
    })
})

const msTimeStamp = String(Date.now())
const userId = "6130afa3fb7b31651e50e48f"
const testId = 1
const percent = 100
const item = {
    msTimeStamp: {S: msTimeStamp},
    userId: {S: userId},
    testId: {N: String(testId)},
    finishedTimeStamp: {"NULL": true},
    percentage: {N: String(percent)}
}
const key = {
    msTimeStamp: {S: msTimeStamp},
    userId: {S: userId}
}

describe("putItem", () => {

    test("Записать результат тестирования", async () => {
        const {getItem, putItem, deleteItem} = dbAPI
        await putItem("testResults", item)
        await expect(await getItem("testResults", key)).toEqual(item)
        await deleteItem("testResults", key)
    })
})

describe("updateItem", () => {

    test("Изменить результат тестирования", async () => {
        const {getItem, putItem, updateItem, deleteItem} = dbAPI
        await putItem("testResults", item)
        const finishedTimeStampUpdates = 1633262400
        const percentageUpdates = 75
        const updateData = {
            expression: "SET finishedTimeStamp = :finishedTimeStamp, percentage = :percentage",
            values: {
                ":finishedTimeStamp": {N: String(finishedTimeStampUpdates)},
                ":percentage": {N: String(percentageUpdates)}
            }
        }
        await updateItem("testResults", key, updateData)
        const result = {
            msTimeStamp: {S: msTimeStamp},
            userId: {S: userId},
            testId: {N: String(testId)},
            finishedTimeStamp: {N: String(finishedTimeStampUpdates)},
            percentage: {N: String(percentageUpdates)}
        }
        await expect(await getItem("testResults", key)).toEqual(result)
        await deleteItem("testResults", key)
    })
})

describe("deleteItem", () => {

    test("Удалить результат тестирования", async () => {
        const {getItems, putItem, deleteItem} = dbAPI
        await putItem("testResults", item)
        await deleteItem("testResults", key)
        const filter = {
            expression: "msTimeStamp = :msTimeStamp and userId = :userId",
            values: {":msTimeStamp": {S: msTimeStamp}, ":userId": {S: userId}}
        }
        const items = await getItems("testResults", filter)
        await expect(items).toHaveLength(0)
    })
})