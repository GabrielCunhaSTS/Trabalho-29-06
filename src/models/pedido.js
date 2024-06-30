const { DataTypes, DECIMAL, INTEGER } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas');
const { ModelCarrinho } = require('./carrinho');
const { ModelCliente } = require('./cliente');

const ModelPedido = conexaoSequelize.define('pedido', {
    cd_pedido: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, 
        primaryKey: true 
    },
    cd_carrinho: DataTypes.INTEGER,
    cd_cliente: DataTypes.INTEGER,
    vl_total_pedido: DataTypes.FLOAT,
    ds_guarda_sol: DataTypes.CHAR(2)
}, padraoTables('pedido'));

ModelCarrinho.hasMany(ModelPedido, {foreignKey: 'cd_carrinho'})
ModelPedido.belongsTo(ModelCarrinho, {foreignKey: 'cd_carrinho'})

ModelCliente.hasMany(ModelPedido, {foreignKey: 'cd_cliente'})
ModelPedido.belongsTo(ModelCliente, {foreignKey: 'cd_cliente'})

module.exports = {
    ModelPedido
}