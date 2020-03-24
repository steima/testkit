export enum RecurrencePattern {
    Weekly = "Weekly",
    BiWeekly = "BiWeekly",
    Monthly = "Monthly"
}

export interface CreateAppointmentSeries {
    startDate: string;
    duration: number;
    recurrencePattern: RecurrencePattern;
    numberRecurrences: number;
    subject?: string;
    description?: string;
    room?: string;
}
