import Appointment, {AppointmentData} from "../../common/rules/Appointment";

type StudentData = {
    id: string
    name: string
    email: string
    appointment: AppointmentData
}

export class Student {

    _id: string
    _name: string
    _email: string
    _appointment: Appointment

    constructor(data: StudentData) {
        const {id, name, email, appointment} = data
        this._id = id
        this._name = name
        this._email = email
        this._appointment = Appointment.create(appointment)
    }

    static create(data: StudentData | null): Student | null {
        return data ? new Student(data) : null
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get email(): string {
        return this._email
    }

    get appointment(): Appointment {
        return this._appointment
    }
}