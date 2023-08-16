export interface IPeopleFields {
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    email: string;
}

export const peopleFields = {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    email: { type: String, required: true}
};