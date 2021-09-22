import Appointment from "./Appointment";
import type {AppointmentData} from "./Appointment";

export type ProfileData = {
    name: string,
    email: string,
    appointment: AppointmentData | null
}

export default class Profile {

    _name: string
    _email: string
    _appointment: Appointment | null

    constructor(data: ProfileData) {
        console.log(data)
        this._name = data.name
        this._email = data.email
        this._appointment = Appointment.create(data.appointment)
    }

    static create(data: ProfileData | null): Profile | null {
        return data ? new Profile(data) : null
    }

    get appointment(): Appointment | null {
        return this._appointment
    }
}