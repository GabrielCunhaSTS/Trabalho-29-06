const { ModelComentario } = require("../models/comentarios");

module.exports={
    adcComentario:async(req,res) =>{
        try{
            const{texto} = req.body
            const idUsuario = req.cookies.cookie_usuario
            const idCarrinho = req.body.idCarrinho

            await ModelComentario.create({
                cd_carrinho: idCarrinho,
                cd_cliente: idUsuario,
                ds_avaliacao: texto
            })
console.log(texto)
            res.redirect(`/reserva/${idCarrinho}`)
        }
        catch(error){
            console.error('Comentario não efetuado', error)
        }
    }
}