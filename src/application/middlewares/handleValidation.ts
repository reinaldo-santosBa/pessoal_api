import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validate = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const erros = validationResult(req);

    if (erros.isEmpty()) {
        return next();
    }

    const extractedErros: string[] = [];

    erros.array().map(err => extractedErros.push(err.msg));

    return res.status(422).json({
        errors: extractedErros,
    });
};
