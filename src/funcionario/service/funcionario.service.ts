import conn from "../../infrastructure/db/config.db";
import { FuncionarioDto } from "../dto/funcionario.dto";

export class FuncionarioService {
    async create(props: FuncionarioDto) {

        /*const pessoa = await conn.query(`INSERT INTO PESSOAS(

        ) VALUES(
          ${}

        )`);


      const funcionario = await conn.query(`INSERT INTO FUNCIONARIOS(

      )VALUES(
        ${}
      )`)

      const pessoaFisica = await conn.query(`INSERT INTO PESSOAS_FISICAS(

      )VALUES(
        ${}
        ${}
      )`)
        return funcionario;*/
    }

    async find() {

    }

    async  findByname() {

    }


    async findById() {

    }

    async update() {

    }

    async delete() {

    }
}
