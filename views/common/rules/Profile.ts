import Appointment from "./Appointment";
import type {AppointmentData} from "./Appointment";

export type ProfileData = {
    id: string
    appointment: AppointmentData | null
} & PersonData

export type PersonData = {
    name: string
    email: string
}

export class Person {

    _name: string
    _email: string

    constructor(data: PersonData) {
        this._name = data.name
        this._email = data.email
    }

    static create(data: PersonData | null): Person | null {
        return data ? new Person(data) : null
    }

    get name(): string {
        return this._name
    }

    get email(): string {
        return this._email
    }
}

export default class Profile extends Person {

    _id: string
    _appointment: Appointment | null

    constructor(data: ProfileData) {
        const {id, appointment, ...personData} = data
        super(personData)
        this._id = data.id
        this._appointment = Appointment.create(data.appointment)
    }

    static create(data: ProfileData | null): Profile | null {
        return data ? new Profile(data) : null
    }

    get id(): string {
        return this._id
    }

    get appointment(): Appointment | null {
        return this._appointment
    }
}