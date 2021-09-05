const appointment = async (parent, args, context) => {
    const {mongoAPI} = context
    const {appointmentId} = parent
    const {findOne} = mongoAPI
    return await findOne("appointments", {id: appointmentId})
}

export const resolvers = {
    Profile: {
        appointment
    }
}