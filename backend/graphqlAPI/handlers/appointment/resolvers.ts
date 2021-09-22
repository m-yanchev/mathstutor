const appointment = async (parent, args, context) => {
    const {mongoAPI} = context
    const {appointmentId} = parent
    const {findOne} = mongoAPI
    return appointmentId ? await findOne("appointments", {id: appointmentId}) : null
}

export const resolvers = {
    Profile: {
        appointment
    }
}