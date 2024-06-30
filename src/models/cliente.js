const { DataTypes, DECIMAL } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas')

const ModelCliente = conexaoSequelize.define('cliente', {
                    // Busca diretamente no banco um table com o nome destro das '' 
    cd_cliente: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, // Definidindo autoIncrement: true (caso a tabela seja cirado sem valor, o próprio banco cria um valor único para esse coluna)
        primaryKey: true 
    },
    nm_cliente: DataTypes.STRING(45),
    nm_sobrenomeC: DataTypes.STRING(45),
    ds_emailC: DataTypes.STRING(100),
    ds_senhaC: DataTypes.STRING(15),
    nmr_telefoneC: DataTypes.DECIMAL(15),
}, padraoTables('cliente'));
// Função feito para padronizar a criação de tabela

module.exports = {
    ModelCliente
}