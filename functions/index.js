const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const cors = require('cors')({ origin: true });


exports.getAllProducts = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        return new Promise(resolve => {
            admin.firestore().collection('products')
                .get()
                .then((querySnapshot) => {
                    const products = [];
                    querySnapshot.forEach((doc) => {
                        products.push({
                            id: doc.id,
                            name: doc.data()['name']
                        });
                    })
                    response.set({ 'Access-Control-Allow-Origin': '*' }).send(products);
                    resolve(true);
                })
        })
    })
})

exports.submitFeedback = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        return new Promise(resolve => {
            const feedback = request.body;
            admin.firestore().collection('feedbacks')
                .add(feedback)
                .then(() => {
                    response.send({
                        success: true
                    });
                    resolve(true);
                })
        })
    });
})