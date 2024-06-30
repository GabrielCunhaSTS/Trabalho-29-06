const { DataTypes, DECIMAL, INTEGER } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas');
const { ModelCliente } = require('./cliente');
const { ModelPedido } = require('./pedido');
const { ModelCarrinho } = require('./carrinho');

const ModelHistorico = conexaoSequelize.define('historico', {
    cd_historico: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, 
        primaryKey: true 
    },
    cd_pedido: DataTypes.INTEGER,
    cd_cliente: DataTypes.INTEGER,
    cd_carrinho: DataTypes.INTEGER,
    vl_total_pedido: DataTypes.FLOAT,
    dt_pedido: DataTypes.DATE
}, padraoTables('historico'))

ModelHistorico.hasMany(ModelPedido, {foreignKey: 'cd_pedido'})
ModelPedido.belongsTo(ModelHistorico, {foreignKey: 'cd_pedido'})

ModelCliente.hasMany(ModelHistorico, {foreignKey: 'cd_cliente'});
ModelHistorico.belongsTo(ModelCliente, {foreignKey: 'cd_cliente'});

ModelHistorico.hasMany(ModelCarrinho, {foreignKey: 'cd_carrinho'});
ModelCarrinho.belongsTo(ModelHistorico, {foreignKey: 'cd_carrinho'});

module.exports = {
    ModelHistorico
}