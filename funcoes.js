const Produto = require("./modelos/produtos");

// listar categorias
const listaCategorias = await Categoria.findAll();
console.log(listaCategorias);

//Buscar categoria por id
const CategoriaId = await Categoria.findByPk('ID');
console.log(CatedoriaID);

//Criar novo produto
// adiciona um ovo produto na tabelaProdutos
        const novoProduto = await Produto.create({
        idcategoria: 1,
        codigo: "1010",
        nome: 'teclado',
        descricao: 'teclado para pc',  
        valor: 200,
        status: 1
        idCategoria: novaCategoria.id

    })



/*encontra a categoria pelo id e todos os produtos com esse id
const categoria = await Categoria.findByPk(1);
Const produtos = awayt Categoria.getProdutos();

ou

const categoria = await Categoria.findByPk(1,{include: Produto});
*/

/*crio uma categoria
const novaCategoria = await Categoria.create({nome:'nomecategoria'});
//encontra o produto pelo id
const produto = awayt Produto.findByPk(1);
//seta as categorias 
await produto.setCategoria([novaCategoria]);



/*criar uma categoria
    const novaCategoria = await Categoria.create({
        codigo: '01',
        titulo: "verde",
        status: 1
    })*/

    //console.log(novaCategoria);

    //leitura da tabela
    //const categorias = await categoria.findAll();
    //categoria.destroy();
    
       
    //listar pelo id
    //const categoria = await Categoria.findByPk(3);

    //await categoria.destroy();
    /* 
    Listar todos com o codigo
    const categorias = await categoria.findAll({
        //where {codigo: 01}
    });
    Alterar dados
    categoria.codigo = '05';
    await(para realizar instrução abaixo) categoria.save();

    Deletar dados
    categoria.destroy();
    categorias.destroy({where: {codigo: 01}})

    */

    //console.log(categorias);

    //Adiciona uma nova categoria   
    /*const novaCategoria = await Categoria.create({
        codigo: '01',
        titulo: "verde",
        status: 1
    })*/

    
    
    /*apaga categoria pelo id
    //const categoria = await Categoria.findByPk(1);
    //await categoria.destroy();*/

    //encontra todos os produtos com categoria igual a 1
    /*const produtos = await Produto.findAll({
       where: {
           idcategoria: 1
       }
       
    });*/

    //produtos.idcategoria = null;
    //await produtos.save();
    /*
    
    
    
    await Produto.update({idcategora: null}, {
        where: { 'idcategoria': 1
        
    }});
     */   

    //produtos.idcategoria = null;
   //await Produtos.save();
   
   
    //novaCategoria.save();
    //console.log(novaCategoria);
    console.log(produtos.length);

    //selecionando o produto pelo id e acessando a categoria do produto.
    const produto = await Produto.findByPk();
    const categoria = await produto.getCategoria();
    console.log(categoria.nome);


    const categoria = await findByPk();
    const produtos = await categoria.getProdutos();


// Editar estoque pelo id do estoque
    const buscaEstoqueEditId = parseInt(readline.question('DIGITE O ID DO ESTOQUE QUE DESEJA EDITAR:'));
    const listaEstoqueEditId = await Estoque.findByPk(buscaEstoqueEditId);
    const novaQuantidade = parseInt(readline.question('DIGITE A NOVA QUANTIDADE:'));
    const novaReserva = parseInt(readline.question('DIGITE A NOVA QUANTIDADE RESERVA:'));
    const novoStatusEstoque = parseInt(readline.question('DIGITE O NOVO STATUS DO ESTOQUE 1 / 0:'));

    listaEstoqueEditId.quantidade = novaQuantidade,
    listaEstoqueEditId.reserva = novaReserva,
    listaEstoqueEditId.status = novoStatusEstoque

    await listaEstoqueEditId.save();


    break;