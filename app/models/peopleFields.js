const peopleFields = {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: String, required: false },
    email: { type: String, required: false }
};

module.exports = peopleFields;