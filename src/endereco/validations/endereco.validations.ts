import { body } from "express-validator";

const enderecoValidations = () => {
    return [
        body("cep")
            .isString()
            .withMessage("O CEP precisa ser uma string")
            .isLength({ min: 8, max: 8 })
            .notEmpty()
            .withMessage("O CEP é obrigatório."),

        body("numero").isNumeric(),

        body("bairro").isString(),

        body("logradouro")
            .isString()
            .notEmpty()
            .withMessage("Logradouro obrigatório"),

        body("cidade")
            .isString()
            .notEmpty()
            .withMessage("Cidade obrigatório"),

        body("estado")
            .isString()
            .notEmpty()
            .withMessage("UF obrigatório"),
    ];
};

export default enderecoValidations;
