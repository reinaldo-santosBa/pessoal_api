import EmailEntity from "../entity/email";

export interface EmailRepository {
  insert(input: EmailEntity): Promise<EmailEntity>;
  getByIdPessoa(pessoa_id: number): Promise<EmailEntity[]>;
  getEmailById(id: number): Promise<number>;
  update(id: number, input: EmailEntity): Promise<EmailEntity>;
  delete(id: number): Promise<void>;
}
