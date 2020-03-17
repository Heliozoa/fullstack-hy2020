import { Gender } from '../types/patient';
import { Response } from 'express';

export const validateString = (name: string, param: any, res: Response<any>): param is string => {
    if (!param) {
        res.json({
            error: `${name} is missing`
        });
        return false;
    } else if (typeof param !== 'string') {
        res.json({
            error: `${name} must be a string`
        });
        return false;
    } else {
        return true;
    }
}

export const validateGender = (param: any, res: Response<any>): param is Gender => {
    if (!param) {
        res.json({
            error: `gender is missing`
        });
        return false;
    } else if (!Object.values(Gender).includes(param)) {
        res.json({
            error: `gender must be one of {${Object.values(Gender)}}`
        });
        return false;
    } else {
        return true;
    }
}