const Sequelize = require('sequelize');

const modelOpt = {
			
			timestamps : false,
			modelName : 'Comment',
			tableName : 'comments',
			paranoid : false,
			charset : 'utf8',
			collate : 'utf8_general_ci'
		}

module.exports = class Comment extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			
			comment : {
				type : Sequelize.STRING(100),
				allowNull : false,
			},
			created_at : {
				type : Sequelize.DATE,
				allowNull : true,
				defaultValue : Sequelize.NOW,
			},
		}, {sequelize, ...modelOpt} );
	}
	
	static associate(db) {
		db.Comment.belongsTo(db.User, { foreignKey : 'commenter', targetKey :'id' });
	}
	
}