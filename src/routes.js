const express = require('express');
const routes = express.Router();
const Sequelize = require('sequelize');
const database = require('../bdtabs');
const Categoria = require('../modelos/categorias');
const Produto = require('../modelos/produtos');
const Estoque = require('../modelos/estoques');
const res = require('express/lib/response');
const fetch = require('cross-fetch');



var reciveEndPoints = [];

function postFunction(informJson) {
    // insere requisição no vetor de endpoints

    var urlServidor = 'http://localhost:8080';
    var urlEndPoint = urlServidor + informJson.path;
    var body = JSON.stringify(informJson.body);
    
    console.log(urlEndPoint)
    fetch(urlEndPoint, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: body
    })
        .then(res => {
            if (res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json();
        })
        .then(user => {
            console.log(user);
        })
        .catch(err => {
            console.error(err);
        });
}

//Inicio da API
(async () => {

    //Listar Todas as Categorias OK
    routes.get('/listarcategorias', async (req, res) => {
        const listaCategorias = await Categoria.findAll();
        return res.json({ listaCategorias })
    })

    //Listar Categorias por id OK
    routes.get('/listarcategoriasporid', async (req, res) => {

        const { id } = req.body

        if (!id) {
            res.status(422).json({ error: 'o id é obrigatório' })
        }

        try {

            const listarCategoriasPorId = await Categoria.findByPk(id)
            return res.json({ listarCategoriasPorId })

        } catch (error) {
            res.status(500).json({ error: error })
        }

    })

    //Inserir categoria OK
    routes.post('/inserircategoria', async (req, res) => {

        const { codigo, titulo, status } = req.body

        if (!codigo) {
            res.status(422).json({ error: 'o codigo é obrigatório' })
        }
        const novaCategoria = req.body

        try {

            await Categoria.create(novaCategoria);
            res.status(201).json({ mensagem: 'Categoria criada' })

        } catch (error) {
            res.status(500).json({ error: error })
        }

        console.log("------- ENVIADO NOVA CATEGORIA PARA O POSTGRES -------")
        postFunction(req);

    })

    //Editar uma categoria por id OK
    routes.patch('/editarcategoria', async (req, res) => {

        const { id } = req.body.idCategoria
        const { codigoCat, tituloCat, statusCat } = req.body.categoria


        if (!codigoCat) {
            res.status(422).json({ error: 'o codigo é obrigatório' })
        }

        try {

            const editaCategoria = await Categoria.findByPk(id)
            console.log(editaCategoria)

            editaCategoria.codigo = codigoCat,
                editaCategoria.titulo = tituloCat,
                editaCategoria.status = statusCat


            await editaCategoria.save(editaCategoria);
            res.status(201).json({ mensagem: 'Categoria editada' })

        } catch (error) {
            res.status(500).json({ error: error })
        }

    })

    //Listar todos os Produtos OK
    routes.get('/listarprodutos', async (req, res) => {
        const listaProdutos = await Produto.findAll();
        return res.json({ listaProdutos })
    })

    //Listar Produtos por id OK
    routes.get('/listarprodutosporid', async (req, res) => {

        const { id } = req.body

        if (!id) {
            res.status(422).json({ error: 'o id é obrigatório' })
        }

        try {

            const listarProdutosPorId = await Produto.findByPk(id)
            return res.json({ listarProdutosPorId })

        } catch (error) {
            res.status(500).json({ error: error })
        }

    })

    //Inserir produto e estoque para o Produto OBS. Status do estoque fica como NULL
    routes.post('/inserirproduto', async (req, res) => {

        console.log(req.body.estoque)
        const { idCategoria, codigo, nome, descricao, valor, status } = req.body.produto
        const { reserva, statusEst } = req.body.estoque

        if (!codigo) {
            res.status(422).json({ error: 'o codigo é obrigatório' })
        }
        const novoProduto = req.body.produto

        try {

            const produtoCriado = await Produto.create(novoProduto);
            console.log(produtoCriado.id);
            res.status(201).json({ mensagem: 'produto criado' })

            const novoEstoque = {
                quantidade: 0,
                reserva,
                statusEst,
                idProduto: produtoCriado.id
            }

            await Estoque.create(novoEstoque);

        } catch (error) {
            res.status(500).json({ error: error })
        }


    })

    //Editar produto por id OK
    routes.patch('/editarprodutoporid', async (req, res) => {

        const { id } = req.body.idProduto
        const { codigoProd, nomeProd, descricaoProd, valorProd, statusProd } = req.body.produto


        if (!codigoProd) {
            res.status(422).json({ error: 'o codigo é obrigatório' })
        }

        try {

            const editaProduto = await Produto.findByPk(id)

            editaProduto.codigo = codigoProd,
                editaProduto.nome = nomeProd,
                editaProduto.descricao = descricaoProd,
                editaProduto.valor = valorProd
            editaProduto.status = statusProd


            await editaProduto.save(editaProduto);
            res.status(201).json({ mensagem: 'Prduto Editado' })

        } catch (error) {
            res.status(500).json({ error: error })
        }

    })

    //Deletar um produto e seu estoque OK
    routes.delete('/deletarprodutoeestoque', async (req, res) => {

        const { id } = req.body

        if (!id) {
            res.status(422).json({ error: 'o id é obrigatório' })
        }

        try {

            const deletaProduto = await Produto.findByPk(id);
            const deletaEstoque = await Estoque.findOne({ where: { idProduto: id } })

            console.log(deletaEstoque)
            await deletaProduto.destroy();
            await deletaEstoque.destroy();



            res.status(201).json({ mensagem: 'Produto Deletado' })


        } catch (error) {
            res.status(500).json({ error: error })
        }


    })

    //Deletar uma categoria por id OK
    routes.delete('/deletarcategoria', async (req, res) => {

        const { id } = req.body

        if (!id) {
            res.status(422).json({ error: 'o id é obrigatório' })
        }

        try {

            const deletaCategoria = await Categoria.findByPk(id);
            await deletaCategoria.destroy();

            res.status(201).json({ mensagem: 'Categoria Deletada' })


        } catch (error) {
            res.status(500).json({ error: error })
        }


    })

    //Lista o Estoque para o Produto pelo Id
    routes.get('/listarestoqueparaproduto', async (req, res) => {

        const { id } = req.body

        if (!id) {
            res.status(422).json({ error: 'o id é obrigatório' })
        }

        try {

            const listaEstoque = await Estoque.findAll({ where: { idProduto: id, } })
            return res.json({ listaEstoque })

        } catch (error) {
            res.status(500).json({ error: error })
        }

    })

    //Editar estoque para produto pelo id
    routes.get('/editarestoqueparaproduto', async (req, res) => {

        const { id } = req.body.idProduto
        const { quantidade, reserva, status } = req.body.estoque

        if (!id) {
            res.status(422).json({ error: 'o id é obrigatório' })
        }

        try {

            const listaEstoque = await Estoque.findAll({ where: { idProduto: id, } })

            listaEstoque.quantidade = quantidade,
                listaEstoque.reserva = reserva,
                listaEstoque.status = status

            await listaEstoque.save();
            return res.json({ listaEstoque })

        } catch (error) {
            res.status(500).json({ error: error })
        }
    })

    //Deletar estoque para o Produto pelo id
    routes.delete('/deletarestoque', async (req, res) => {

        const { id } = req.body

        if (!id) {
            res.status(422).json({ error: 'o id é obrigatório' })

        }
        res.status(501).json({ error: 'Não se pode deletar um estoque' })

    })


})();


module.exports = routes;

