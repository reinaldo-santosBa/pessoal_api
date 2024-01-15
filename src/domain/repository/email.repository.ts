import EmailEntity from "../entity/email";

export interface EmailRepository {
  insert(input: EmailEntity): Promise<void>;
  getByIdPessoa(pessoa_id: number): Promise<void>;
  update(id: number, input: EmailEntity): Promise<void>;
  delete(id: number): Promise<void>;
}
