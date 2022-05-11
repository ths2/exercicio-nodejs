const res = require('express/lib/response');
const { _DBG_clearHistory } = require('readline-sync');

//cria tabelas e instâncias das tabelas
(async () => {
    const express = require ('express');
    const Sequelize = require('sequelize');
    const readline = require('readline-sync');
    const database = require('./bdtabs');
    const Categoria = require('./modelos/categorias');
    const Produto = require ('./modelos/produtos');
    const Estoque = require ('./modelos/estoques');

    await database.sync();

    var result = 'n';
    var opcao = '0';

    //loop para sair do programa
    while (result != 's'){

        console.log(' OPÇÕES:');
        console.log('1 PARA CRIAR CATEGORIA:');
        console.log('2 PARA CRIAR PRODUTO:');
        console.log('3 LISTAR TODAS AS CATEGORIAS:');
        console.log('4 LISTAR CATEGORIA POR ID:');
        console.log('5 EDITAR UMA CATEGORIA POR ID:');
        console.log('6 DELETA UMA CATEGORIA POR ID');
        console.log('7 LISTA TODOS OS PRODUTOS');
        console.log('8 LISTAR PRODUTO POR ID:');
        console.log('9 EDITAR PRODUTO POR ID:');
        console.log('10 DELETAR UM PRODUTO E SEU ESTOQUE:');
        console.log('11 LISTAR O ESTOQUE PARA O PRODUTO PELO ID:');
        console.log('12 EDITAR O ESTOQUE PARA O PRODUTO PELO ID:');


        const opcao = readline.question('DIGITE O NUMERO DA OPCAO:');
        
        switch(opcao){

            case '1':
                //funciona
                
                console.log('Criar categoria:');
                const codigoCat = readline.question('DIGITE O CODIGO DA CATEGORIA:');
                const tituloCat = readline.question('DIGITE O TITULO DA CATEGORIA:');
                const statusCat = parseInt(readline.question('DIGITE O STATUS DA CATEGORIA 1 / 0:'));

                const novaCategoria = await Categoria.create({
                codigo: codigoCat,
                titulo: tituloCat,
                status: statusCat
                                               
            })

             console.log(novaCategoria);
            
             break

            case '2':
                //Fuciona??
                console.log('Criar Produto:');
                const categoriaProduto = parseInt(readline.question('DIGITE O ID DA CATEGORIA DO PRODUTO:'));
                const codigoProduto = readline.question('DIGITE O CODIGO DO PRODUTO:');
                const nomeProduto = readline.question('DIGITE O NOME DO PRODUTO:');
                const descricaoProduto = readline.question('DIGITE A DESCRICAO DO PRODUTO:');
                const valorProduto = parseFloat(readline.question('DIGITE O VALOR DO PRODUTO:'));
                const statusProduto = parseInt(readline.question('DIGITE O STATUS D0 PRODUTO 1 / 0:'));
                
                             
                const novoProduto = await Produto.create({
                    codigo: codigoProduto,
                    nome: nomeProduto,
                    descricao: descricaoProduto,
                    valor: valorProduto,
                    status: statusProduto,
                    idCategoria: categoriaProduto 
                    
                })

                const novoEstoque = await Estoque.create({
                    quantidade: 0,
                    reserva: 0,
                    status: 1,
                    idProduto: novoProduto.id
                })

                
                break;

            case '3':
                
                console.log('Listar categorias:');
                const listaCategorias = await Categoria.findAll();
                console.log(listaCategorias);
                return res.json(listaCategorias);               


                break;

            case '4':
                //funciona
                console.log('Buscar categoria por id:');
                const buscaCat = parseInt(readline.question('DIGITE O ID DA CATEGORIA:'));
                const listaCatId = await Categoria.findByPk(buscaCat);
                console.log(listaCatId);

                break;
            
            case '5':
                //funciona
                console.log('Editar uma Categoria:');
                const buscaCatEdit = parseInt(readline.question('DIGITE O ID DA CATEGORIA QUE DESEJA EDITAR:'));
                const listaCatIdEdit = await Categoria.findByPk(buscaCatEdit);
                const novoValorCodigo = readline.question('DIGITE O NOVO CODIGO:');
                const novoTitulo = readline.question('DIGITE O NOVO TITULO:');
                const novoStatusCat = parseInt(readline.question('DIGITE O NOVO STATUS:'));
                listaCatIdEdit.codigo = novoValorCodigo,
                listaCatIdEdit.titulo = novoTitulo,
                listaCatIdEdit.status = novoStatusCat

                await listaCatIdEdit.save();

                break;
            
            case '6':
                
                //Funciona até então
                console.log('Deleta uma Categoria:');
                const buscaCatDel = parseInt(readline.question('DIGITE O ID DA CATEGORIA QUE DESEJA DELETAR:'));
                const listaCatIdDel = await Categoria.findByPk(buscaCatDel);
                const listaProdutosNull = await Produto.findAll();
                
                if  (listaProdutosNull.idCategoria == buscaCatDel) {

                    await listaProdutosNull.save({where: { idCategoria: null }});
              
                }    
                
                await listaCatIdDel.destroy();

                break;
            
            case '7':
                //funciona
                console.log('Listar Todos os Produtos:');
                const listaProdutos = await Produto.findAll();
                console.log(listaProdutos);

                break;
            
            case '8':
                //funciona
                console.log('Buscar um produto por ID:');
                const buscaProduto = parseInt(readline.question('DIGITE O ID DA CATEGORIA:'));
                const listaProdutosId = await Produto.findByPk(buscaProduto);
                console.log(listaProdutosId);

                break;

            case '9':
                //Funciona
                console.log('Editar um produto por ID:');
                const buscaProdutoEdit = parseInt(readline.question('DIGITE O ID DO PRODUTO QUE DESEJA EDITAR:'));
                const listaProdutoIdEdit = await Produto.findByPk(buscaProdutoEdit);
                const novoValorCodigoProduto = readline.question('DIGITE O NOVO CODIGO DO PRODUTO:');
                const novoNomeProduto = readline.question('DIGITE O NOVO TITULO:');
                const novoValorProduto = parseFloat(readline.question('DIGITE O NOVO VALOR DO PRODUTO:'));
                const novoStatusProduto = parseFloat(readline.question('DIGITE O NOVO STATUS DO PRODUTO:'));
                listaProdutoIdEdit.codigo = novoValorCodigoProduto,
                listaProdutoIdEdit.nome = novoNomeProduto,
                listaProdutoIdEdit.valor = novoValorProduto,
                listaProdutoIdEdit.status = novoStatusProduto
                await listaProdutoIdEdit.save();
                

                break;

            case '10':
                //Funciona???
                console.log('Deleta um produto e seu estoque pelo ID:');
                const buscaProdutoDel = parseInt(readline.question('DIGITE O ID DO PRODUTO QUE DESEJA DELETAR:'));
                const listaProdutoIdDel = await Produto.findByPk(buscaProdutoDel);
                const listaEstoqueDel = await Estoque.findByPk(buscaProdutoDel);
                
                await listaEstoqueDel.destroy({where: { idProduto: buscaProdutoDel }});
                await listaProdutoIdDel.destroy();


                break;

            case '11':
                console.log('Lista o estoque para o produto pelo ID:');

                break;
            
            case '12':
                //Ainda não terminei
                //Funciona Pelo ID do estoque
                console.log('Lista o estoque para o produto pelo ID:');
                const buscaProdutoEditId = parseInt(readline.question('DIGITE O ID DO ESTOQUE QUE DESEJA EDITAR:'));
                //const listaProdutoEditId = await Estoque.findByPk(buscaProdutoEditId);
                const listaEstoqueEditId = await Estoque.findAll({
                    where: { idProduto: buscaProdutoEditId,

                }});
            
                const novaQuantidade = parseInt(readline.question('DIGITE A NOVA QUANTIDADE:'));
                const novaReserva = parseInt(readline.question('DIGITE A NOVA QUANTIDADE RESERVA:'));
                const novoStatusEstoque = parseInt(readline.question('DIGITE O NOVO STATUS DO ESTOQUE 1 / 0:'));
                            
                
                listaEstoqueEditId.quantidade = novaQuantidade,
                listaEstoqueEditId.reserva = novaReserva,
                listaEstoqueEditId.status = novoStatusEstoque
                await listaEstoqueEditId.save();  
          
                                

                break;
        


            case '13':
                console.log('Deletar Estoque:');
                console.log('501 - NOT IMPLEMENTED Não pode deletar Estoque');

                break;
         
        }



        const sair = readline.question("deseja sair? s/n: ");
        result = sair;
    }
   
    
    console.log('O programa acabou!!!!');
    
    
})();
