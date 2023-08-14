const peopleFields = {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    email: { type: String, required: true }
};

module.exports = peopleFields;