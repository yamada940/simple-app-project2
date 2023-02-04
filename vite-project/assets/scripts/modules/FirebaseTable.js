import * as firebase from "firebase/app";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { firebaseConfig } from "./const";

export default class FirebaseTable {
    constructor(obj) {
        // firebaseを初期化し、firebaseAppにプロジェクト情報を格納する
        const firebaseApp = firebase.initializeApp(firebaseConfig);
        
        // firestoreのデータを変数「db」に格納する
        this.db = getFirestore(firebaseApp);
        this.dbName = obj.dbName;
        this.tableId = obj.tableId;
    }

    async showData() {
        // 複数ドキュメントへの参照を取得し、「q」に格納する
        const q = query(collection(this.db, this.dbName));
        // 条件に合ったドキュメントを「querySnapshot」に格納する
        const querySnapshot = await getDocs(q);
        const $table = document.getElementById(this.tableId);

        querySnapshot.forEach((doc) => {
            const tagTr = document.createElement('tr');

            const columns = [
                doc.data().first,
                doc.data().last,
                doc.data().born
            ];

            for(let index = 0; index < columns.length; index++) {
                const tagTd = document.createElement('td');
                tagTd.textContent = columns[index];
                // tagTr直下、最後の子の後にtagTdを挿入する
                tagTr.insertAdjacentElement('beforeend', tagTd);
            }
            // $table直下、最初の子の前
            $table.insertAdjacentElement('afterbegin', tagTr);
        }); 

    }
}