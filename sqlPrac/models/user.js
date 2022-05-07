const Sequelize = require('sequelize');

const modelOpt = {
			
			timestamps : false,
			underscored : false,
			modelName : 'User',
			tableName : 'users',
			paranoid : false,
			charset : 'utf8',
			collate : 'utf8_general_ci'
		}

module.exports = class User extends Sequelize.Model {
	static init(sequelize) {
		return super.init({
			name : {
				type : Sequelize.STRING(50),
				allowNull: false,
				unique : true
			},
			age : {
				type : Sequelize.INTEGER.UNSIGNED,
				allowNull : false
			},
			married : {
				type : Sequelize.BOOLEAN,
				allowNull : false,
			},
			comment : {
				type : Sequelize.TEXT,
				allowNull : false,
			},
			created_at : {
				type : Sequelize.DATE,
				allowNull : false,
				defaultValue : Sequelize.NOW,
			},
		}, {sequelize, ...modelOpt}  );
	}
	
	static associate(db) {
		db.User.hasMany(db.Comment, { foreignKey : 'commenter', sourceKey : 'id' });
	}
	
}