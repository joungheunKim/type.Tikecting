import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from './entities/user.entity';
import dotenv from 'dotenv';
import { Concert } from './entities/concert.entity';
import { Concert_date } from './entities/concertData.entity';
import { Reservation } from './entities/reservation.entity';
dotenv.config();


export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: true,
  entities: [User,Concert,Concert_date, Reservation],
  migrations: [],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
});