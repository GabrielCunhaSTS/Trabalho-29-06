const { DataTypes, DECIMAL, INTEGER } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas');
const {ModelCliente} = require('./cliente')

const ModelClubeUsuario = conexaoSequelize.define('clube_usuario', {
    cd_clube: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, 
        primaryKey: true 
    },
    cd_cliente: DataTypes.INTEGER,
    qt_pontos: DataTypes.DECIMAL(45)
}, padraoTables('clube_usuario'));

ModelCliente.hasMany(ModelClubeUsuario, {foreignKey: 'cd_cliente'});
ModelClubeUsuario.belongsTo(ModelCliente, {foreignKey: 'cd_cliente'});

module.exports = {
    ModelClubeUsuario
}