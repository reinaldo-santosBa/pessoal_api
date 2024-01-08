import { body } from "express-validator";

const cargoValidations = () => {
    return [
        body("cargo")
            .isString()
            .withMessage("O cargo precisa ser uma string")
            .notEmpty()
            .withMessage("O cargo é obrigatório."),

        body("salario")
            .isNumeric()
            .notEmpty()
            .withMessage("O salário é obrigatório."),

        body("comissao_direta").isNumeric(),

        body("comissao_indireta")
            .isNumeric(),
    ];
};

export default cargoValidations;
