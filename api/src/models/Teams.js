const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Team",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate: { isUUID: 4 },
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "El titulo no puede estar vacío.",
          },
          len: {
            args: [1, 100],
            msg: "La descripción debe tener entre 1 y 100 caracteres.",
          },
        },
      },

      logo: {
        type: DataTypes.STRING,
        defaultValue:
          "https://res.cloudinary.com/dz9smi3nc/image/upload/v1686540721/x6gxctlhk4vdxxrvzklo.jpg",
        validate: {
          isUrl: true,
        },
      },
      
      history: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "El JSON no puede estar vacío.",
          },
        },
      },

      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "La descripción no puede estar vacía.",
          },
        },
        len: {
          args: [1, 255],
          msg: "La descripción debe tener entre 1 y 255 caracteres.",
        },
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
};
