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
	if (event.data.val()) return;

	const _chat = {};
	_chat.users = {};
	_chat.users[event.params.selfId] = true;
	_chat.users[event.params.friendId] = true;

	// Create a new chat room for the new friends and save its id
	adminRef.child("/chats/").push(_chat)
		.then((snapshot) => {
			_chat.id = snapshot.key;
			// Save the id as /friends/$selfId/$friendId for future access
			return adminRef.child("/friends/"+event.params.selfId+"/"+event.params.friendId).set(_chat.id);
		}).then(() => {
			// Get the friend info to save to lastMessages
			return adminRef.child("/users/"+event.params.friendId).once("value");
		}).then((snapshot) => {
			// Save it to lastMessages
			return adminRef.child("/lastMessages/"+event.params.selfId+"/"+_chat.id).set({
				content: "Tap here to start talking to your new friend!",
				displayName: snapshot.val().displayName,
				friendId: snapshot.key,
				photoUrl: snapshot.val().photoUrl,
				time: Date.now()
			});
		}).then(() => {
			// If everything worked fine, then add the user as a friend of his new friend :D
			return adminRef.child("/friends/"+event.params.friendId+"/"+event.params.selfId).set(_chat.id);
		}).then(() => {
			// Get slef info to save to lastMessages
			return adminRef.child("/users/"+event.params.selfId).once("value");
		}).then((snapshot) => {
			// Save it to lastMessages of friend
			return adminRef.child("/lastMessages/"+event.params.friendId+"/"+_chat.id).set({
				content: "Tap here to start talking to your new friend!",
				displayName: snapshot.val().displayName,
				friendId: snapshot.key,
				photoUrl: snapshot.val().photoUrl,
				time: Date.now()
			});
		});

});

exports.updateLastMessages = functions.database.ref("/chats/{chatId}/messages").onWrite(event => {
	event.data.ref.parent.child("users").once("value")
		.then((snapshot) => {
			Object.keys(snapshot.val()).map((key, i) => {
				adminRef.child("/lastMessages/"+key+"/"+event.params.chatId).update({
					content: "Tap here to start talking to your new friend!",
					time: Date.now()
				});
			});
		});
});

exports.createThumbnail = functions.storage.object().onChange(event => {
	console.log("TODO: create thumbnail");
});
