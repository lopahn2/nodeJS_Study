const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model {
	static init(sequelize){
		return super.init({
			title : {
				type : Sequelize.STRING(50),
				allowNull : false,
				unique : true,
			}
		}, {
			sequelize,
			timestamp : true,
			underscored : false,
			modelName : 'Hashtag',
			tableName : 'hashtags',
			paranoid : false,
			charset : 'utf8mb4',
			collate : 'utf8mb4_general_ci',
		});
	}
	
	static associtate(db) {
		db.Hashtag.belongsToMany(db.Post, {through : 'PostHashtag'});
	}
}