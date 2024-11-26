import fs from "fs"; // Importa o módulo fs do Node.js para interagir com o sistema de arquivos
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js"; // Importa as funções para obter todos os posts e criar um novo post do modelo de posts
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    // Função assíncrona para listar todos os posts
    const posts = await getTodosPosts(); // Chama a função para obter todos os posts do banco de dados
    res.status(200).json(posts); // Retorna os posts em formato JSON com status 200 (sucesso)
}

export async function postarNovoPost(req, res) {
    // Função assíncrona para criar um novo post
    const novoPost = req.body; // Obtém os dados do novo post do corpo da requisição
    try {
        const postCriado = await criarPost(novoPost); // Chama a função para criar o novo post no banco de dados
        res.status(200).json(postCriado); // Retorna o post criado em formato JSON com status 200 (sucesso)
    } catch (error) {
        // Captura qualquer erro que possa ocorrer durante a criação do post
        console.error(error.message); // Imprime a mensagem de erro no console
        res.status(500).json({ "Erro": "Falha na requisição" }); // Retorna um erro 500 com uma mensagem genérica
    }
}

export async function mandarImagem(req, res) {
    // Função assíncrona para enviar uma imagem e criar um novo post
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname, // Utiliza o nome original do arquivo como URL da imagem
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost); // Cria um novo post com a URL da imagem
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`; // Gera um novo nome para a imagem com base no ID do post
        fs.renameSync(req.file.path, imagemAtualizada); // Renomeia o arquivo para o novo nome
        res.status(200).json(postCriado); // Retorna o post criado com status 200 (sucesso)
    } catch (error) {
        console.error(error.message); // Imprime a mensagem de erro no console
        res.status(500).json({ "Erro": "Falha na requisição" }); // Retorna um erro 500 com uma mensagem genérica
    }
}
export async function atualizarNovoPost(req, res) {
    // Função assíncrona para criar um novo post
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)


        const postAtualizado = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }


        const postCriado = await atualizarPost(id, postAtualizado); // Chama a função para criar o novo post no banco de dados
        res.status(200).json(postCriado); // Retorna o post criado em formato JSON com status 200 (sucesso)
    } catch (error) {
        // Captura qualquer erro que possa ocorrer durante a criação do post
        console.error(error.message); // Imprime a mensagem de erro no console
        res.status(500).json({ "Erro": "Falha na requisição" }); // Retorna um erro 500 com uma mensagem genérica
    }
}