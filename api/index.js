const express = require('express');
const mysql = require('mysql2'); 


const start = async() =>{
  const app = express();

let db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'projeto_individual',
        port: 3306
  }).promise();

  app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept'),
    
    next();
  });

  app.use(express.json());


  app.listen(3300, () => {
    console.log(`API iniciada na porta 3300`);
  });

  app.get("/", async(_, response,)=>{
    await db.execute("CREATE TABLE teste (id INT PRIMARY KEY, nome VARCHAR(45), idade INT)");

    return response.json("Criacao realizada com sucesso!");
  });

  app.post("/user/register", async(request, response)=> {
    const {id, nome, idade} = request.body;

     if(id && nome && idade){
      await db.execute("INSERT INTO teste VALUES (?, ?,?)", 
        [id, nome,idade]
      );
      
      return response.json("Inserção realizada com sucesso !");
    };
  });

} 
start();

