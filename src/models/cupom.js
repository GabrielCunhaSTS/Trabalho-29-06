const { DataTypes, DECIMAL, INTEGER } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas');
const { ModelCliente } = require('./cliente');
const { ModelCarrinho } = require('./carrinho');

const ModelCupom = conexaoSequelize.define('cupons', {
    cd_cupom:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, 
        primaryKey: true 
    },
	vl_cupom: DataTypes.DECIMAL(10,2),
    dt_validade_cupom: DataTypes.DATE,
    cd_carrinho: DataTypes.INTEGER,
    cd_cliente: DataTypes.INTEGER,
}, padraoTables('cupons'))

ModelCliente.hasMany(ModelCupom, {foreignKey: 'cd_cliente'})
ModelCupom.belongsTo(ModelCliente, {foreignKey: 'cd_cliente'})

ModelCarrinho.hasMany(ModelCupom, {foreignKey: 'cd_carrinho'})
ModelCupom.belongsTo(ModelCarrinho, {foreignKey: 'cd_carrinho'})

module.exports = {
    ModelCupom
}