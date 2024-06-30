const { DataTypes, DECIMAL } = require('sequelize')
const {conexaoSequelize} = require('../../config/bdConnection')
const {padraoTables} = require ('../../config/configTabelas');
const { ModelCardapio } = require('./cardapio');

const ModelProduto = conexaoSequelize.define('produto', {
    cd_produto: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true, // Definidindo autoIncrement: true (caso a tabela seja cirado sem valor, o próprio banco cria um valor único para esse coluna)
        primaryKey: true 
    },
    cd_cardapio: DataTypes.INTEGER,
    nm_produto: DataTypes.STRING(45),
    ds_produto: DataTypes.TEXT(150),
    vl_produto: DataTypes.FLOAT,
    ds_categoria:DataTypes.ENUM('doce', 'salgado', 'bebida')
}, padraoTables('produto'));

ModelCardapio.hasMany(ModelProduto, {foreignKey: 'cd_cardapio'});
ModelProduto.belongsTo(ModelCardapio, {foreignKey: 'cd_cardapio'})

module.exports = {
    ModelProduto
}