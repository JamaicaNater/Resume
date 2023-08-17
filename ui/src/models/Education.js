export default class Education {
    constructor(
        name = '',
        degreeType = '',
        major = '',
        minor = '',
        gpa = 0.0,
        details = [],
        enrollmentDate = '',
        graduationDate = '',
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
        this.enrollmentDate = enrollmentDate;
        this.graduationDate = graduationDate;
        this.city = city;
        this.state = state;
        this.country = country;
    }
}
