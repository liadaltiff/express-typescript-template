/**
 * Main task interface, this corresponds to a תורנות.
 */
interface Task {
    _id?: number;
    name: string;
    soldierId: string;
    date: Date;
    startingHour: string;
    endingHour: string;
    askedForExchange?: boolean;
}

export interface DecodedTask {
    date: string;
}

export default Task;
