module.exports = (sequelize, DataTypes) => {
  const Testimonial = sequelize.define('Testimonial', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id'
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'testimonials',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  return Testimonial;
};
