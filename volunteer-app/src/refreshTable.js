import { db, doc } from './index.js';
import { deleteDoc } from "firebase/firestore";

export const refreshTable = async (members) => {
    await Promise.all(members.map(async (member) => {
        if (member.inServer === member.inTimeSheet === member.signedWaiver === true && !member.paused) {
            await deleteDoc(doc(db, "Interns", member.id));
        }
    }));
    window.location.reload();
};

export default refreshTable;