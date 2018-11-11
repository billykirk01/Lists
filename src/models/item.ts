export interface item {
    id?: String;
    name: String;
    owningUser: String;
    owningList: String;
    addInstant: firebase.firestore.FieldValue;
    completed: Boolean;
}