import { server } from "./src/app.js";
import { connectDb } from "./src/config/db.js";
import dns from 'node:dns/promises';
dns.setServers(['8.8.8.8', '1.1.1.1']); 
connectDb()
server.listen(3000,()=>{
    console.log('running in port 3000');
})