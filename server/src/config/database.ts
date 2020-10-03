import path from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { CreditCardInfo } from "../entities/creditCardInfo";
import { User } from "../entities/user";

export async function createDatabaseConection() {
  return createConnection({
    type: "postgres",
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, "./../migrations/*")],
    entities: [User, CreditCardInfo],
  });
}
