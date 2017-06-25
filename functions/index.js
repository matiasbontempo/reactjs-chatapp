const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require("./chatapp-4c029-firebase-adminsdk-4chmr-37ef72fdaf.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chatapp-4c029.firebaseio.com"
});
const adminRef = admin.database().ref();

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello from Firebase!");
});

exports.newFriend = functions.database.ref("/friends/{selfId}/{friendId}").onWrite(event => {

	if (event.data.previous.exists()) return;

	adminRef.child("/users/"+event.params.selfId).once("value")
		.then((snapshot) => {
			adminRef.child("/lastMessages/"+event.params.selfId+"/"+event.params.friendId).set({
				content: "Tap here to start talking to your new friend!",
				displayName: snapshot.val().displayName,
				photoUrl: snapshot.val().photoUrl,
				time: Date.now()
			});
			event.data.ref.parent.child(event.params.friendId).set(true);
		});

	adminRef.child("/friends/"+event.params.friendId+"/"+event.params.selfId).set(false);

});

exports.createThumbnail = functions.storage.object().onChange(event => {
	console.log("TODO: create thumbnail");
});
