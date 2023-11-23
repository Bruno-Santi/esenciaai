const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "Role",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
                validate: { isUUID: 4 },
            },

            role: {
                type: DataTypes.ENUM,
                values: ["creator", "admin", "user", "anonymous"],
                allowNull: false,
            },

            status: {
                type: DataTypes.ENUM,
                values: ["pending", "accepted", "none"],
                allowNull: false,
            },
        },
        { 
            timestamps: true,
            paranoid: true, // Habilitar el borrado lógico
        }
    );
};