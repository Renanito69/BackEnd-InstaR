import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"; // Importa a função para conectar ao banco de dados

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Estabelece a conexão com o banco de dados usando a string de conexão do ambiente

export async function getTodosPosts() {
    // Função assíncrona para obter todos os posts
    const db = conexao.db("intencivo-alura"); // Seleciona o banco de dados "intencivo-alura"
    const colecao = db.collection("posts"); // Seleciona a coleção "posts"
    return colecao.find().toArray(); // Busca todos os documentos da coleção e retorna como um array
}

export async function criarPost(novoPost) {
    // Função assíncrona para criar um novo post
    const db = conexao.db("intencivo-alura"); // Seleciona o banco de dados "intencivo-alura"
    const colecao = db.collection("posts"); // Seleciona a coleção "posts"
    return colecao.insertOne(novoPost); // Insere o novo post na coleção e retorna o resultado da inserção
}
export async function atualizarPost(id, novoPost) {
    // Função assíncrona para criar um novo post
    const db = conexao.db("intencivo-alura"); // Seleciona o banco de dados "intencivo-alura"
    const colecao = db.collection("posts"); // Seleciona a coleção "posts"
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({ _id: new ObjectId(objID) }, {$set:novoPost} );
}

