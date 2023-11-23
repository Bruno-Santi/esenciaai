const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate: { isUUID: 4 },
      },
      
      
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },

      nickname: {
        type: DataTypes.STRING,
        defaultValue: null,
        unique: true
      },
      
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      
      token_password: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: { isUUID: 4 }, 
      },
      
      photo: {
        type: DataTypes.STRING,
        defaultValue:
          "https://res.cloudinary.com/dz9smi3nc/image/upload/v1686530902/shop-mugs/3106921_i0bgb6.png",
        validate: {
          isUrl: true,
        },
      },
      
      premium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },

      premium_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },

      super_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }

    },
    { 
      timestamps: true,
      paranoid: true, // Habilitar el borrado lógico
  }
  );
};
