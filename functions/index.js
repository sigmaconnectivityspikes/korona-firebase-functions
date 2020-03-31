const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.sendNotificationOnNewInfection = functions.firestore.document('/infections/{infectionId}').onCreate((snap, context) => {
		const infection = snap.data();
		const payload = {
			notification: {
				title: 'New infection',
				body: `User with id: ${infection.hashId} infected!!`
			},
			data: {
				hash: `${infection.hashId}`
			}
		};

		return admin.messaging().sendToTopic("infections", payload)
			.then(function (response) {
				console.log('Notification sent successfully:', response);
			})
			.catch(function (error) {
				console.log('Notification send failed', error);
			});
	});
