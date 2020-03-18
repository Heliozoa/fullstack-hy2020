import { Gender } from '../types/patient';
import { EntryType, HealthRating } from '../types/entry';
import { Response } from 'express';

export const validateEntryType = (name: string, param: any, res: Response<any>): param is EntryType => {
    if (param === undefined) {
        res.json({
            error: `${name} is missing`
        });
        return false;
    } else if (!Object.values(EntryType).includes(param)) {
        res.json({
            error: `${name} must be one of ${Object.values(EntryType)}`
        });
        return false;
    } else {
        return true;
    }
}
export const validateHealthRating = (param: any, res: Response<any>): param is HealthRating => {
    if (param === undefined) {
        res.json({
            error: `healthCheckRating is missing`
        });
        return false;
    } else if (param in HealthRating) {
        return true;
    } else {
        res.json({
            error: `invalid healthCheckRating value`
        });
        return false;
    }
}

export const validateString = (name: string, param: any, res: Response<any>): param is string => {
    if (param === undefined) {
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

export const validateStringArray = (name: string, param: any, res: Response<any>): param is string[] => {
    if (param === undefined) {
        res.json({
            error: `${name} is missing`
        });
        return false;
    } else if (!Array.isArray(param)) {
        res.json({
            error: `${name} must be an array`
        });
        return false;
    } else {
        param.forEach(p => {
            if (typeof p !== 'string') {
                res.json({
                    error: `${name} must be an array of strings`
                });
                return false;
            }
        });
        return true;
    }
}

export const validateGender = (param: any, res: Response<any>): param is Gender => {
    if (param === undefined) {
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