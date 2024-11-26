import express from 'express';
import routes from './src/routes/postsRoutes.js';

const serve = express();
serve.use(express.static("uploads"))
routes(serve)

serve.listen(3000, () => {
    console.log("Servidor Escutando...");
});

serve.get("/posts",);
