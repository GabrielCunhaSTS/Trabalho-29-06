const { DataTypes, DECIMAL, INTEGER } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas');
const { ModelCliente } = require('./cliente');

const ModelNotificacao = conexaoSequelize.define('notificacao', {
    cd_notificacao:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, 
        primaryKey: true 
    },
    cd_cliente: DataTypes.INTEGER,
    ds_titulo: DataTypes.TEXT(500),
    ds_descricao: DataTypes.TEXT(500),
    ds_tipo: DataTypes.ENUM('Cupom','Pedido','Pontos', 'Atualiza'),
    ds_vizu: DataTypes.BOOLEAN
}, padraoTables('notificacao'))

module.exports = {
    ModelNotificacao
}