import { Response } from 'express';

export const validateString = (name: string, param: any, res: Response<any>): param is string => {
    if (!param) {
        res.json({
            error: `${name} is missing`
        });
        return false;
    } else if (typeof param !== 'string') {
        res.json({
            error: `${param} must be a string`
        });
        return false;
    } else {
        return true;
    }
}
