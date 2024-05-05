import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ROLES {
  admin = 'admin',
  client = 'client',
  supplier = 'supplier',
}

export enum CURRENT_STATUS {
  online = 'online',
  offline = 'offline',
  away = 'away',
}

export enum REGISTRATION_METHODS {
  password = 'password',
  google = 'google'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: null })
  emailVerifiedAt: Date;

  @Column({ default: null, nullable: true })
  mobileNo: string;

  @Column()
  country: string;

  @Column()
  password: string;

  // @Column({
  //   enum: [UserConstants.ROLES.admin, UserConstants.ROLES.client, UserConstants.ROLES.supplier],
  //   default: [],
  // })
  // role: string[];

  @Column({
    type: 'enum',
    enum: ROLES,
    default: null,
  })
  role: ROLES;

  @Column({
    type: 'enum',
    enum: CURRENT_STATUS,
    default: CURRENT_STATUS.online,
  })
  currentStatus: CURRENT_STATUS;

  @Column({ default: null })
  gender: string;

  @Column({ default: null })
  referralCode: string;

  @Column({ type: 'bigint', nullable: true })
  referredBy: string;

  @Column({ default: null })
  profileImage: string;

  @Column({ type: 'json', default: null })
  preference: object;

  @Column({
    type: 'enum',
    enum: REGISTRATION_METHODS,
    default: REGISTRATION_METHODS.password,
  })
  registrationMethod: REGISTRATION_METHODS;

  @Column({ default: null })
  hash: string;

  @Column({ type: 'double precision', default: 0 })
  walletBalance: number;

  @Column({ default: null })
  isLastActive: string;

  @Column({ default: null })
  Industry: string;

  @Column({ type: 'double precision', default: 0 })
  averageRating: number;

  @Column({ default: 0 })
  totalRatings: number;

  @Column({ default: null })
  customerId: string;

  @Column({ default: null })
  stripeAccountId: string;

  @CreateDateColumn({ default: null })
  expiredAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
