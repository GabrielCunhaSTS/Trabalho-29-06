const { DataTypes, DECIMAL, INTEGER } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas');
const { ModelPlano } = require('./plano');

const Modelbarraqueiro = conexaoSequelize.define('barraqueiro', {
    cd_barraqueiro: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, 
        primaryKey: true 
    },
    nm_barraqueiro: DataTypes.STRING(85),
    nm_sobrenomeB: DataTypes.STRING(85),
    ds_emailB: DataTypes.STRING(100),
    cd_cpfB: DataTypes.CHAR(17),
    ds_senhaB: DataTypes.STRING(15),
    nmr_telefoneB: DataTypes.CHAR(20),
    cd_plano: DataTypes.INTEGER,
    cd_token: DataTypes.STRING(100)
}, padraoTables('cardapio'));

ModelPlano.hasMany(Modelbarraqueiro, {foreignKey: 'cd_plano'})
Modelbarraqueiro.belongsTo(ModelPlano, {foreignKey: 'cd_plano'})

module.exports = {
    Modelbarraqueiro
}