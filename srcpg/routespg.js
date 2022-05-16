const express = require ('express');
const routespg = express.Router();
const Sequelize = require('sequelize');
const databasepg = require('../bdtabspg');
const CategoriaPg = require('../modelospg/categoriaspg');
const ProdutoPg = require ('../modelospg/produtospg');
const EstoquePg = require ('../modelospg/estoquespg');
const res = require('express/lib/response');


//Inicio da API

(async () => {

    //Inserir categoria OK
    routespg.post('/inserircategoria', async (req,res) => {

        const {codigo, titulo, status} = req.body
                
       
        if (!codigo) {
            res.status(422).json({error: 'o codigo é obrigatório'})
        }
        const novaCategoria = req.body
      
        try {
    
            await CategoriaPg.create(novaCategoria);
            res.status(201).json({mensagem: 'Categoria criada'})
            console.log(novaCategoria)
                        
        } catch (error) {
            res.status(500).json({error: error})
        }  
        
           
    }) 
   
    //Listar todos os Produtos OK
    routespg.get('/listarprodutos', async (req,res) => {
        const listaProdutos = await Produto.findAll();
        return res.json({listaProdutos})
    })
 

    //Listar Produtos por id OK
    routespg.get('/listarprodutosporid', async (req,res) => {
       
        const {id} = req.body

        if (!id) {
            res.status(422).json({error: 'o id é obrigatório'})
        }
                     
        try {
           
        const listarProdutosPorId = await Produto.findByPk(id)
        return res.json({listarProdutosPorId})

        } catch (error) {
            res.status(500).json({error: error})
        }

    })

    //Editar produto por id OK
    routespg.patch('/editarprodutoporid', async (req,res) => {

        const {id} = req.body.idProduto
        const {codigoProd, nomeProd, descricaoProd, valorProd, statusProd} = req.body.produto
                
       
        if (!codigoProd) {
            res.status(422).json({error: 'o codigo é obrigatório'})
        }         
      
        try {
    
            const editaProduto = await Produto.findByPk(id)
           
            editaProduto.codigo = codigoProd,
            editaProduto.nome = nomeProd,
            editaProduto.descricao = descricaoProd,
            editaProduto.valor = valorProd
            editaProduto.status = statusProd
                        
                        
            await editaProduto.save(editaProduto);
            res.status(201).json({mensagem: 'Prduto Editado'})
                        
        } catch (error) {
            res.status(500).json({error: error})
        }  
               
    }) 

    //Deletar um produto e seus estoque OK
    routespg.delete('/deletarprodutoeestoque', async (req,res) => {

        const {id} = req.body       
       
        if (!id) {
            res.status(422).json({error: 'o id é obrigatório'})
        } 
          
        try {

            const deletaProduto = await Produto.findByPk(id);
            const deletaEstoque = await Estoque.findOne({where: { idProduto: id }})
           
            console.log(deletaEstoque)
            await deletaProduto.destroy();
            await deletaEstoque.destroy();
            
            
                      
            res.status(201).json({mensagem: 'Produto Deletado'})
                        
              
        }catch (error) {
            res.status(500).json({error: error})
        }               
            
        
    }) 
       
    //Listar Todas as Categorias OK
    routespg.get('/listarcategorias', async (req,res) => {
        const listaCategorias = await CategoriaPg.findAll();
        
        
        const {id} = req.headers;

        if (id) {
            console.log('---- RECBENDO JSON POSTGRESS --- ')
            console.log('---- AI LEPS --- ')
        }
        
       
        return res.json({listaCategorias})


    }) 

    //Listar Categorias por id OK
    routespg.get('/listarcategoriasporid', async (req,res) => {
       
        const {id} = req.body;
            

        if (!id) {
            res.status(422).json({error: 'o id é obrigatório'})
        }
                     
        try {
           
        const listarCategoriasPorId = await CategoriaPg.findByPk(id)
        return res.json({listarCategoriasPorId})

        } catch (error) {
            res.status(500).json({error: error})
        }

    })


    //Inserir produto e estoque para o Produto OBS. Status do estoque fica como NULL
    routespg.post('/inserirproduto', async (req,res) => {

        console.log(req.body.estoque)
        const {idCategoria, codigo, nome, descricao, valor, status} = req.body.produto
        const {reserva, statusEst} = req.body.estoque    
        
        if (!codigo) {
            res.status(422).json({error: 'o codigo é obrigatório'})
        }
        const novoProduto = req.body.produto 
              
        try {
    
            const produtoCriado = await ProdutoPg.create(novoProduto);
            console.log(produtoCriado.id);
            res.status(201).json({mensagem: 'produto criado'})
    
            const novoEstoque = {
                quantidade: 0,
                reserva,
                statusEst,
                idProduto: produtoCriado.id
            }

            await EstoquePg.create(novoEstoque);
        
        } catch (error) {
            res.status(500).json({error: error})
        }  
        
           
    }) 

    //Editar uma categoria OK
    routespg.patch('/editarcategoria', async (req,res) => {

        const {id} = req.body.idCategoria
        const {codigoCat, tituloCat, statusCat} = req.body.categoria
                
       
        if (!codigoCat) {
            res.status(422).json({error: 'o codigo é obrigatório'})
        }         
      
        try {
    
            const editaCategoria = await CategoriaPg.findByPk(id)
            console.log(editaCategoria)

            editaCategoria.codigo = codigoCat,
            editaCategoria.titulo = tituloCat,
            editaCategoria.status = statusCat
                        
                        
            await editaCategoria.save(editaCategoria);
            res.status(201).json({mensagem: 'Categoria editada'})
                        
        } catch (error) {
            res.status(500).json({error: error})
        }  
               
    }) 

    //Deletar uma categoria por id OK
    routespg.delete('/deletarcategoria', async (req,res) => {

        const {id} = req.body       
       
        if (!id) {
            res.status(422).json({error: 'o id é obrigatório'})
        } 
          
        try {

            const deletaCategoria = await CategoriaPg.findByPk(id);
            await deletaCategoria.destroy();
                      
            res.status(201).json({mensagem: 'Categoria Deletada'})
                        
              
        }catch (error) {
            res.status(500).json({error: error})
        }               
            
        
    }) 

    //Lista o Estoque para o Produto pelo Id
    routespg.get('/listarestoqueparaproduto', async (req,res) => {
       
        const {id} = req.body

        if (!id) {
            res.status(422).json({error: 'o id é obrigatório'})
        }
                     
        try {
           
        const listaEstoque = await EstoquePg.findAll({ where: { idProduto: id,}})
        return res.json({listaEstoque})

        } catch (error) {
            res.status(500).json({error: error})
        }

    })

    //Editar estoque para produto pelo id
    routespg.get('/editarestoqueparaproduto', async (req,res) => {
       
        const {id} = req.body.idProduto
        const {quantidade, reserva, status} = req.body.estoque

        if (!id) {
            res.status(422).json({error: 'o id é obrigatório'})
        }
                     
        try {
         
        const listaEstoque = await EstoquePg.findAll({ where: { idProduto: id,}})
        
        listaEstoque.quantidade = quantidade,
        listaEstoque.reserva = reserva,
        listaEstoque.status = status

        await listaEstoque.save();
        return res.json({listaEstoque})

        } catch (error) {
            res.status(500).json({error: error})
        }
    })


    //Deletar estoque para o Produto pelo id
    routespg.delete('/deletarestoque', async (req,res) => {

        const {id} = req.body       
       
        if (!id) {
            res.status(422).json({error: 'o id é obrigatório'})
            
        } 
        res.status(501).json({error: 'Não se pode deletar um estoque'})
         
    })           

   

})();


module.exports = routespg;
