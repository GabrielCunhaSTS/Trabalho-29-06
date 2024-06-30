const { DataTypes, DECIMAL, INTEGER } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas')

const ModelPlano = conexaoSequelize.define('plano', {
    cd_plano: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, 
        primaryKey: true 
    },
    nm_plano: DataTypes.STRING(30),
    dt_plano: DataTypes.DATE,
    vl_plano: DataTypes.DECIMAL(3,1)
}, padraoTables('plano'));

module.exports = {
    ModelPlano
}