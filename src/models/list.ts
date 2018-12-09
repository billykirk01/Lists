export interface list {
    id?: string;
    name: string;
    owningUser: string;
    addInstant: firebase.firestore.FieldValue;
}