import React, { useState, useEffect } from 'react';
import { HealthRating, Patient, Gender, Diagnosis, Entry, HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry, EntryType } from "../types";
import { RouteComponentProps } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { Segment, Icon, Button } from 'semantic-ui-react';
import axios from "axios";
import { useStateValue } from '../state';
import { updatePatient } from '../state/reducer';
import { isArray } from 'util';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';

type DiagnosisMap = { [id: string]: Diagnosis } | undefined | null;

const PatientView: React.FC<RouteComponentProps<{ id: string | undefined }>> = ({ match }) => {
    const id = match.params.id;
    if (id === undefined) {
        throw new Error('cannot use component without :id');
    }

    const [state, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [patient, setPatient] = useState<Patient | undefined | null>(undefined);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (patient: Patient, values: EntryFormValues) => {
        try {
            const {
                date,
                specialist,
                diagnosisCodes,
                description,
                healthCheckRating,
                dischargeDate,
                dischargeCriteria,
                employerName,
                sickLeaveStartDate,
                sickLeaveEndDate,
                type,
            } = values;

            const postData = {
                date,
                specialist,
                diagnosisCodes,
                description,
                healthCheckRating,
                discharge: {
                    date: dischargeDate,
                    criteria: dischargeCriteria,
                },
                employerName,
                sickLeave: {
                    startDate: sickLeaveStartDate,
                    endDate: sickLeaveEndDate,
                },
                type,
            };

            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${patient.id}/entries`,
                postData
            );
            dispatch(updatePatient(updatedPatient));
            closeModal();
        } catch (e) {
            console.error(e.response.data);
            setError(e.response.data.error);
        }
    };

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
                console.error(err);
                setPatient(null);
            });
        } else {
            setPatient(existing);
        }
    }, [state.patients]);


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

    const genderAbbr = (gender: Gender): "man" | "woman" | "other gender vertical" => {
        switch (gender) {
            case Gender.Male:
                return "man";
            case Gender.Female:
                return "woman";
            case Gender.Other:
                return "other gender vertical";
            default:
                const _n: never = gender;
                throw new Error('never gender');
        }
    };

    return <div>
        <h2>{patient.name} <Icon name={genderAbbr(patient.gender)} /></h2>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <h3>entries</h3>
        <Entries entries={patient.entries} />
        <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={(values) => submitNewEntry(patient, values)}
            error={error}
            onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>;
};

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
                }, {}));
            } else {
                setDiagnoses(null);
            }
        }).catch(err => {
            console.log(err);
            setDiagnoses(null);
        });
    }, []);

    return <>{entries.map(e => {
        return <Segment key={e.id}>
            <EntryDetails entry={e} diagnoses={diagnoses} />
        </Segment>;
    })}</>;
};

const EntryDetails: React.FC<{ entry: Entry; diagnoses: DiagnosisMap }> = ({ entry, diagnoses }) => {
    switch (entry.type) {
        case EntryType.Hospital:
            return <HospitalEntryView entry={entry} diagnoses={diagnoses} />;
        case EntryType.OccupationalHealthcare:
            return <OccupationalHealthcareView entry={entry} diagnoses={diagnoses} />;
        case EntryType.HealthCheck:
            return <HealthCheckView entry={entry} diagnoses={diagnoses} />;
        default:
            const _n: never = entry;
            throw new Error('never type');
    }
};

const HospitalEntryView: React.FC<{ entry: HospitalEntry; diagnoses: DiagnosisMap }> = ({ entry, diagnoses }) => {
    return <>
        <h3>{entry.date} <Icon name="hospital outline" /></h3>
        <div>{entry.description}</div>
        <div>discharged due to {entry.discharge.criteria} on {entry.discharge.date}</div>
        <ul>
            <DiagnosisView entry={entry} diagnoses={diagnoses} />
        </ul>
    </>;
};

const OccupationalHealthcareView: React.FC<{ entry: OccupationalHealthcareEntry; diagnoses: DiagnosisMap }> = ({ entry, diagnoses }) => {
    const sickLeave = (leave: { startDate: string; endDate: string } | undefined) => {
        if (leave) {
            return <div>Sick leave: {leave.startDate} - {leave.endDate}</div>;
        } else {
            return <></>;
        }
    };

    return <>
        <h3>{entry.date} <Icon name="doctor" /> {entry.employerName}</h3>
        {sickLeave(entry.sickLeave)}
        <div>{entry.description}</div>
        <ul>
            <DiagnosisView entry={entry} diagnoses={diagnoses} />
        </ul>
    </>;
};

const HealthCheckView: React.FC<{ entry: HealthCheckEntry; diagnoses: DiagnosisMap }> = ({ entry, diagnoses }) => {
    const healthRating = (rating: HealthRating): string => {
        switch (rating) {
            case HealthRating.Healthy:
                return 'healthy';
            case HealthRating.LowRisk:
                return 'low risk';
            case HealthRating.HighRisk:
                return 'high risk';
            case HealthRating.CriticalRisk:
                return 'critical risk';
            default:
                const _n: never = rating;
                throw new Error('never rating');
        }
    };

    return <>
        <h3>{entry.date} <Icon name="stethoscope" /></h3>
        <div>{entry.description}</div>
        <ul>
            <DiagnosisView entry={entry} diagnoses={diagnoses} />
        </ul>
        <div>Health rating: {healthRating(entry.healthCheckRating)}</div>
    </>;
};

interface DiagnosisViewProps {
    entry: Entry;
    diagnoses: DiagnosisMap;
}

const DiagnosisView = ({ entry, diagnoses }: DiagnosisViewProps) => {
    const getDiagnosisName = (code: string, diagnoses: DiagnosisMap): string => {
        if (!diagnoses || !(code in diagnoses)) {
            return '';
        }

        return diagnoses[code].name;
    };

    return <>{
        entry.diagnosisCodes?.map(c => {
            return <li key={c}>{c} {getDiagnosisName(c, diagnoses)}</li>;
        })
    }</>;
};

export default PatientView;