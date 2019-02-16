import moment from "moment";
import * as admin from "firebase-admin";

const serviceAccount = require("../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://operation-pizza.firebaseio.com"
});

const db = admin.firestore();
const ordersRef = db.collection("orders");

/*

Add pizza order data

Return a promise
*/

export async function AddPizzaData({
  child_name,
  email,
  grade,
  order_type,
  parent_name,
  quantity_pizza,
  teacher
}) {
  return ordersRef
    .add({
      child: {
        grade,
        name: child_name,
        teacher
      },
      order: {
        slices: quantity_pizza,
        type: order_type
      },
      parent: {
        email,
        name: parent_name
      },
      timestamp: moment().format("MMMM Do YYYY, h:mm:ss a")
    })
    .then(ref => {
      return { success: true, message: ref.id };
    })
    .catch(err => {
      return { success: false, message: err };
    });
}
