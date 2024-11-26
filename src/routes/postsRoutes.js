import express from "express"; // Importa o framework web Express para criar o servidor
import multer from "multer"; // Importa o middleware Multer para lidar com uploads de arquivos
import cors from "cors"
// Importa as funções para listar, postar e enviar imagens do controlador de posts
import { listarPosts, postarNovoPost, mandarImagem, atualizarNovoPost,  } from "../controllers/postsController.js";

const corsOption = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento para os arquivos enviados pelo Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define o diretório de destino para os arquivos enviados
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Define o nome do arquivo (mantendo o nome original)
        cb(null, file.originalname);
    }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas para o servidor
const routes = (serve) => {
    // Habilita o parse de dados JSON nas requisições
    serve.use(express.json());
    serve.use(cors(corsOption))

    // Rota GET para listar todos os posts
    serve.get("/posts", listarPosts);

    // Rota POST para criar um novo post
    serve.post("/posts", postarNovoPost);

    // Rota POST para fazer upload de uma imagem
    // Utiliza o middleware Multer para lidar com o arquivo enviado
    serve.post("/upload", upload.single("imagem"), mandarImagem);

    serve.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função de rotas para ser utilizada em outros módulos
export default routes;