export default class Education {
    constructor(
        name = '',
        degreeType = '',
        major = '',
        minor = '',
        gpa = 0.0,
        details = [],
        startDate = '',
        endDate = '',
        city = '',
        state = '',
        country = ''
    ) {
        this.name = name;
        this.degreeType = degreeType;
        this.major = major;
        this.minor = minor;
        this.gpa = gpa;
        this.details = details;
        this.startDate = startDate;
        this.endDate = endDate;
        this.city = city;
        this.state = state;
        this.country = country;
    }
}
