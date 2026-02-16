export default class TicketService {
    constructor(repository) {
        this.repository = repository;
    }

    async createTicket(data) {
        return await this.repository.createTicket(data);
    }
}

