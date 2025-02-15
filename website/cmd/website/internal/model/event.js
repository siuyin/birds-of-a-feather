class Event {
    constructor(id, name, date, location, hostOrganization, numberOfParticipants, imageUrls) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.location = location;
        this.hostOrganization = hostOrganization;
        this.numberOfParticipants = numberOfParticipants;
        this.imageUrls = imageUrls;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            date: this.date,
            location: this.location,
            hostOrganization: this.hostOrganization,
            numberOfParticipants: this.numberOfParticipants,
            imageUrls: this.imageUrls
        };
    }

    static fromJSON(json) {
        return new Event(
            json.id,
            json.name,
            json.date,
            json.location,
            json.hostOrganization,
            json.numberOfParticipants,
            json.imageUrls
        );
    }
}

export default Event;
