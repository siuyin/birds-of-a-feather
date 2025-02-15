const Type = Object.freeze({
    EDUCATION: 'education',
    COMPANY: 'company'
});

const Level = Object.freeze({
    STUDENT: 'student',
    TEACHER: 'teacher',
    ADMIN: 'admin',
    EVENTS: 'events',
    LOGISTICS: 'logistics'
});

class User {
    constructor(id, name, email, type, level) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.type = type;
        this.level = level;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            type: this.type,
            level: this.level
        };
    }

    static fromJSON(json) {
        return new User(json.id, json.name, json.email, json.type, json.level);
    }

}
