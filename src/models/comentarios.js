const { DataTypes, DECIMAL, INTEGER } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas');
const { ModelCarrinho } = require('./carrinho');
const { ModelCliente } = require('./cliente');


const ModelComentario = conexaoSequelize.define('avaliacao',{
    cd_avali: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    cd_carrinho: DataTypes.INTEGER,
    cd_cliente: DataTypes.INTEGER,
    ds_avaliacao: DataTypes.TEXT(500),
    qt_estrelas: DataTypes.DECIMAL(5,1),
},padraoTables('avaliacao'))

ModelCarrinho.hasMany(ModelComentario, {foreignKey: 'cd_carrinho'});
ModelComentario.belongsTo(ModelCarrinho, {foreignKey: 'cd_carrinho'})


ModelCliente.hasMany(ModelComentario, {foreignKey: 'cd_cliente'});
ModelComentario.belongsTo(ModelCliente, {foreignKey: 'cd_cliente'})


module.exports ={
    ModelComentario
}