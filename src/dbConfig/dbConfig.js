import { connect } from "mongoose";


console.log(process.env.DB_URL)
const dbConnection = async() =>{
    try{
        const conn  = await connect(process.env.DB_URL)
       
    }catch(e){
        console.log(e)
    }
}


export default dbConnection;