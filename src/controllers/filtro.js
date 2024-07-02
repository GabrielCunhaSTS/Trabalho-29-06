const { conexaoSequelize } = require("../../config/bdConnection")

module.exports = {
    filtroSalgado: async (req, res) => {
        try{
            const result = await conexaoSequelize.query('call Relatorio_categoria (?,?)',{
                replacements: ['salgado', 1],
                raw: true
            });
    
            console.log(result)
            return res.status(201).json({ msg: `amém` });
        }
        catch {
            return res.status(500).json({ msg: 'F' });
        }
    }
}