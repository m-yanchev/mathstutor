const lessons = async (parent, args, context) => {
    const {mongoAPI} = context
    const {lessonIDList} = parent
    const {findOne} = mongoAPI
    return await Promise.all(lessonIDList.map(id => findOne("lessons", {id})))
}

export const resolvers = {
    Course: {
        lessons
    }
}