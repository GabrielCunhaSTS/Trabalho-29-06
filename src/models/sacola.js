const { DataTypes } = require('sequelize');
const { conexaoSequelize } = require('../../config/bdConnection');
const { padraoTables } = require('../../config/configTabelas');
const { ModelPedido } = require('./pedido');
const { ModelProduto } = require('./produto');

const ModelSacola = conexaoSequelize.define('sacola', {
    cd_pedido: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: ModelPedido,
            key: 'cd_pedido'
        }
    },
    cd_produto: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
            model: ModelProduto,
            key: 'cd_produto'
        }
    },
    quantidade: DataTypes.INTEGER
}, padraoTables('sacola'));

ModelPedido.hasMany(ModelSacola, { foreignKey: 'cd_pedido' });
ModelSacola.belongsTo(ModelPedido, { foreignKey: 'cd_pedido' });

ModelProduto.hasMany(ModelSacola, { foreignKey: 'cd_produto' });
ModelSacola.belongsTo(ModelProduto, { foreignKey: 'cd_produto' });

module.exports = {
    ModelSacola
};
