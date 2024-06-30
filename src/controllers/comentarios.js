const { ModelComentario } = require("../models/comentarios");

module.exports={
    batata:async(req,res) =>{
        try{
            const{texto} = req.body
            const idUsuario = req.cookies.cookie_usuario
            const idCarrinho = req.query.idCarrinho

            await ModelComentario.create({
                cd_carrinho: idCarrinho,
                cd_cliente: idUsuario,
                ds_avaliacao: texto
            })

            res.redirect('/carrinho')
        }
        catch(Erro){
            console.Erro('Comentario não efetuado', Erro)
        }
    }
}