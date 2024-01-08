import { EmailDto } from "../dto/email.dto";

export default class EmailService {
    async create(props: EmailDto[]) {
        console.log(props);
    }
}
