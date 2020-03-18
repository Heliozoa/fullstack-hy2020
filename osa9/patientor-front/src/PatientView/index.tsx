import React, { useState, useEffect } from 'react';
import { Patient, Gender, Diagnosis, Entry } from "../types";
import { RouteComponentProps } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import axios from "axios";
import { useStateValue } from '../state';
import { updatePatient } from '../state/reducer';
import { isArray } from 'util';

type DiagnosisMap = { [id: string]: Diagnosis } | undefined | null;

const PatientView: React.FC<RouteComponentProps<{ id: string | undefined }>> = ({ match }) => {
    const id = match.params.id;
    if (id === undefined) {
        throw new Error('cannot use component without :id');
    }

    const [state, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient | undefined | null>(undefined);

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

    const genderAbbr = (gender: Gender) => {
        let genderAbbr;

        switch (gender) {
            case Gender.Male:
                genderAbbr = "M";
                break;
            case Gender.Female:
                genderAbbr = "F";
                break;
            case Gender.Other:
                genderAbbr = "O";
                break;
            default:
                const n: never = gender;
                break;
        };

        return genderAbbr;
    }

    return <div>
        <h2>{patient.name} [{genderAbbr(patient.gender)}]</h2>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <h3>entries</h3>
        <Entries entries={patient.entries} />
    </div>
}

interface EntriesProps {
    entries: Entry[];
}

const Entries = ({ entries }: EntriesProps) => {
    const [diagnoses, setDiagnoses] = useState<DiagnosisMap>(undefined);

    useEffect(() => {
        axios.get<Diagnosis[] | Error>(`${apiBaseUrl}/diagnoses`).then(({ data }) => {
            if (isArray(data)) {
                setDiagnoses(data.reduce<{ [code: string]: Diagnosis }>((map, diag) => {
                    map[diag.code] = diag;
                    return map;
                }, {}))
            } else {
                setDiagnoses(null);
            }
        }).catch(err => {
            setDiagnoses(null);
        });
    }, [])

    return <>{entries.map(e => {
        return <div key={e.id}>
            <div>{e.date} {e.description}</div>
            <ul>
                <EntryView entry={e} diagnoses={diagnoses} />
            </ul>
        </div>
    })}</>
}

interface EntryViewProps {
    entry: Entry,
    diagnoses: DiagnosisMap,
}

const EntryView = ({ entry, diagnoses }: EntryViewProps) => {
    const getDiagnosisName = (code: string, diagnoses: DiagnosisMap): string => {
        if (!diagnoses || !(code in diagnoses)) {
            return '';
        }

        return diagnoses[code].name;
    }

    return <>{
        entry.diagnosisCodes?.map(c => {
            return <li key={c}>{c} {getDiagnosisName(c, diagnoses)}</li>
        })
    }</>
}

export default PatientView;