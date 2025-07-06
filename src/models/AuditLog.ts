// models/AuditLog.js
import { DataTypes } from "sequelize";
import sequelize from "../db/config.js"; // Adjust the path as necessary

const AuditLog = sequelize.define(
  "AuditLog",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("success", "failure"),
      allowNull: false,
    },
  },
  {
    tableName: "audit_logs",
    timestamps: false,
  }
);

export default AuditLog;
