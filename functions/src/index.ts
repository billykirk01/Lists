import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.deleteList = functions.firestore.document("/lists/{listID}").onDelete((snapshot, context) => {
    const listID = context.params.listID;

    return db.collection('items').where('owningList', '==', listID).get()
        .then(snap => {
            snap.forEach(doc => {
                return doc.ref.delete()
            });
        })
        .catch(err => {
            console.log('Error deleting tasks', err);
        });
})