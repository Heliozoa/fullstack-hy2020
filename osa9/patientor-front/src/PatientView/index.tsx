import React, { useState, useEffect } from 'react';
import { Patient, Gender } from "../types";
import { RouteComponentProps } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { useStateValue } from '../state';
import { updatePatient } from '../state/reducer';

const PatientView: React.FC<RouteComponentProps<{ id: string | undefined }>> = ({ match }) => {
    const id = match.params.id;
    if (id === undefined) {
        throw new Error('cannot use component without :id');
    }

    const [state, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient | undefined | null>();

    useEffect(() => {
        const existing = state.patients[id];

        if (!existing || !existing.ssn) {
            axios.get<Patient | Error>(`${apiBaseUrl}/patients/${id}`).then(({ data }) => {
                if ('id' in data) {
                    setPatient(data);
                    dispatch(updatePatient(data));
                } else {
                    setPatient(null);
                }
            }).catch(err => {
                setPatient(null);
            });
        } else {
            setPatient(existing);
        }
    }, []);


    if (patient === undefined) {
        return <div>
            loading...
        </div>;
    }

    if (patient === null) {
        return <div>
            No such patient found.
        </div>;
    }

    let gender;

    switch (patient.gender) {
        case Gender.Male:
            gender = "M";
            break;
        case Gender.Female:
            gender = "F";
            break;
        case Gender.Other:
            gender = "O";
            break;
        default:
            const n: never = patient.gender;
            break;
    };

    return <div>
        <h2>{patient.name} [{gender}]</h2>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
    </div>
}

export default PatientView;