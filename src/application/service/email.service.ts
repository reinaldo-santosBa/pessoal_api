import EmailEntity, { EmailProps } from "../../domain/entity/email";
import { EmailRepository } from "../../domain/repository/email.repository";

export default class EmailService{
    constructor(private readonly emailRepository: EmailRepository) { }

    async create(input: EmailProps) {
        const email = new EmailEntity(input);
        await this.emailRepository.insert(email);
    }

    async getByIdPessoa(pessoa_id: number) {
        await this.emailRepository.getByIdPessoa(pessoa_id);
    }

    async delete(id: number) {
        await this.emailRepository.delete(id);
    }
    async update(id: number, input: EmailEntity): Promise<void> {

    }
}
