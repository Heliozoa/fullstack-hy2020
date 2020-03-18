import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntryOption } from "./FormField";
import { EntryType } from "../types";
import { NumberField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

export type EntryFormValues = {
    date: string;
    specialist: string;
    diagnosisCodes: string[];
    description: string;
    healthCheckRating: number;
    dischargeDate: string;
    dischargeCriteria: string;
    employerName: string;
    sickLeaveStartDate: string;
    sickLeaveEndDate: string;
    type: EntryType;
};

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}

const entryTypeOptions: EntryOption[] = [
    { value: EntryType.HealthCheck, label: "Health check" },
    { value: EntryType.Hospital, label: "Hospital" },
    { value: EntryType.OccupationalHealthcare, label: "Occupational healthcare" }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    const initialType = EntryType.HealthCheck;
    const [entryType, setEntryType] = useState<EntryType>(initialType);
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
            initialValues={{
                date: "",
                specialist: "",
                diagnosisCodes: [],
                description: "",
                healthCheckRating: 0,
                dischargeDate: "",
                dischargeCriteria: "",
                employerName: "",
                sickLeaveStartDate: "",
                sickLeaveEndDate: "",
                type: initialType,
            }}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (typeof values.healthCheckRating !== 'number' && values.type === EntryType.HealthCheck) {
                    errors.healthCheckRating = "Rating must be a number";
                } else if ((values.healthCheckRating > 3 || values.healthCheckRating < 0) && values.type === EntryType.HealthCheck) {
                    errors.healthCheckRating = "Rating must be between 0 and 3";
                }
                if (!values.dischargeDate && values.type === EntryType.Hospital) {
                    errors.dischargeDate = requiredError;
                }
                if (!values.dischargeCriteria && values.type === EntryType.Hospital) {
                    errors.dischargeCriteria = requiredError;
                }
                if (!values.employerName && values.type === EntryType.OccupationalHealthcare) {
                    errors.employerName = requiredError;
                }
                if (!values.sickLeaveStartDate && values.sickLeaveEndDate && values.type === EntryType.OccupationalHealthcare) {
                    errors.sickLeaveStartDate = "Cannot only fill in end date";
                }
                if (!values.sickLeaveEndDate && values.sickLeaveStartDate && values.type === EntryType.OccupationalHealthcare) {
                    errors.sickLeaveEndDate = "Cannot only fill in start date";
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <SelectField
                            label="Type"
                            name="type"
                            options={entryTypeOptions}
                            value={entryType}
                            onChange={({ target }) => {
                                setEntryType(target.value);
                                setFieldValue("type", target.value);
                            }}
                        />
                        <Field
                            label="Date"
                            placeholder="Date"
                            name="date"
                            component={TextField}
                            enabled={true}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                            enabled={true}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                            enabled={true}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                            enabled={true}
                        />
                        <Field
                            label="Health check rating"
                            placeholder="Health check rating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                            enabled={entryType === EntryType.HealthCheck} />
                        <Field
                            label="Discharge date"
                            placeholder="Discharge date"
                            name="dischargeDate"
                            component={TextField}
                            enabled={entryType === EntryType.Hospital} />
                        <Field
                            label="Discharge criteria"
                            placeholder="Discharge criteria"
                            name="dischargeCriteria"
                            component={TextField}
                            enabled={entryType === EntryType.Hospital} />
                        <Field
                            label="Employer name"
                            placeholder="Employer name"
                            name="employerName"
                            component={TextField}
                            enabled={entryType === EntryType.OccupationalHealthcare} />
                        <Field
                            label="Sick leave start date"
                            placeholder="Sick leave start date"
                            name="sickLeaveStartDate"
                            component={TextField}
                            enabled={entryType === EntryType.OccupationalHealthcare} />
                        <Field
                            label="Sick leave end date"
                            placeholder="Sick leave end date"
                            name="sickLeaveEndDate"
                            component={TextField}
                            enabled={entryType === EntryType.OccupationalHealthcare} />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}>
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
