import EmailEntity, { EmailProps } from "../../domain/entity/email";
import { EmailRepository } from "../../domain/repository/email.repository";
import { EmailValidator } from "../../utils/email.validator";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";

export default class EmailService {
    constructor(private readonly emailRepository: EmailRepository) {}

    async create(input: EmailProps): Promise<EmailEntity> {
        if (!input.email) {
            throw new AppError("E-mail Obrigatório");
        }

        const emailValidator = new EmailValidator();
        if (!emailValidator.isValid(input.email)) {
            throw new AppError("E-mail Inválido", status.UNPROCESSABLE_ENTITY);
        }

        const email = new EmailEntity(input);
        const newEmail = await this.emailRepository.insert(email);

        return newEmail;
    }

    async getByIdPessoa(pessoa_id: number): Promise<EmailEntity[]> {
        const emails =  await this.emailRepository.getByIdPessoa(pessoa_id);

        return emails;
    }

    async delete(id: number) {
        const emailExisting = await this.emailRepository.getEmailById(id);

        if (!emailExisting) {
            throw new AppError("E-mail não encontrado", status.NOT_FOUND);
        }
        await this.emailRepository.delete(id);
    }

    async update(id: number, input: EmailProps): Promise<EmailEntity> {

        if (!input.email) {
            throw new AppError("E-mail Obrigatório");
        }

        const emailExisting = await this.emailRepository.getEmailById(id);

        if (!emailExisting) {
            throw new AppError("E-mail não encontrado", status.NOT_FOUND);
        }
        const emailValidator = new EmailValidator();
        if (!emailValidator.isValid(input.email)) {
            throw new AppError("E-mail Inválido", status.BAD_REQUEST);
        }

        const email = new EmailEntity(input);
        const emailUpdate = await this.emailRepository.update(id, email);

        return emailUpdate;
    }
}
