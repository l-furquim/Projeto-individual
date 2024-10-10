const express = require('express');
const mysql = require('mysql2'); 

const start = async() =>{
  const app = express();

/*   let db = mysql.createPool({
        host: 'localhost',
        user: 'usuario',
        password: 'usuario@2003',
        database: 'projeto-individual',
        port: 3306
  }).promise(); */

  app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
  });

  app.listen(3300, () => {
    console.log(`API iniciada na porta 3300`);
  });

  app.get("/", (_, response)=> {
    return response.json("GET REALIZADO")
  });
} 
start();

function cadastrar(){
  
}