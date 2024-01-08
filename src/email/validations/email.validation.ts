import { body } from "express-validator";

const emailValidations = () => {
    return [
        body("email")
            .isString()
            .withMessage("O email precisa ser uma string")
            .notEmpty()
            .withMessage("O email é obrigatório.")
            .isEmail()
            .withMessage("Precisa ser um email valido"),
    ];
};

export default emailValidations;
