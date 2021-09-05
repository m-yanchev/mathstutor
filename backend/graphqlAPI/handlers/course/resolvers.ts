const course = async (parent, args, context) => {
    const {mongoAPI} = context
    const {courseId} = parent
    const {findOne} = mongoAPI
    return await findOne("courses", {id: courseId})
}

export const resolvers = {
    Appointment: {
        course
    }
}