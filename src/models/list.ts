export interface list {
    id?: string;
    name: string;
    owningUser: string;
    owningUserName: string;
    sharedUsers?: string[]
    addInstant: firebase.firestore.FieldValue;
}