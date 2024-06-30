const { DataTypes, DECIMAL, INTEGER } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas')

const ModelCardapio = conexaoSequelize.define('cardapio', {
    cd_cardapio: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, 
        primaryKey: true 
    },
    cd_carrinho: DataTypes.INTEGER
}, padraoTables('cardapio'));

module.exports = {
    ModelCardapio
}