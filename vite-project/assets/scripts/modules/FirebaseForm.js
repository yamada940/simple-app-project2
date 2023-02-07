import firebase from "firebase/compat/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseConfig } from "./const";

export default class FirebaseForm {
    constructor(obj) {
        // firebaseを初期化し、firebaseAppにプロジェクト情報を格納する
        const firebaseApp = firebase.initializeApp(firebaseConfig);
        // 接続情報を変数dbに格納
        this.db = getFirestore(firebaseApp);

        this.dbName = obj.dbName;
        this.$form = document.getElementById(obj.formId);
        this.$form.addEventListener('submit', (e) => this.handleClick(e));
    }

    async insertNewUser() {
        await addDoc(collection(this.db, this.dbName), {
            first: this.$form.querySelector('input[name=first]').value,
            last: this.$form.querySelector('input[name=last]').value,
            born: this.$form.querySelector('input[name=born]').value
        })
        .then((docRef) => {
            window.alert(`Success! ... ID: ${docRef.id}`);
        })
        .catch((error) => {
            window.alert(`Error! ... ${error}`);
        });
    }

    handleClick(e) {
        e.preventDefault();
        this.insertNewUser();
    }
}