import axios from "axios"

const AddToLog = async (action:string)=>{
    const user = localStorage.getItem("username");
   await axios.post("http://localhost:5000/api/logs/Add", {user: user, action: action})
}

export default AddToLog;