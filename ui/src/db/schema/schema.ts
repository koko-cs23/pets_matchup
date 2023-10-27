import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import {
  pgTable,
  text,
  varchar,
  timestamp,
  uuid,
  integer,
  primaryKey
} from 'drizzle-orm/pg-core';
import { AdapterAccount } from 'next-auth/adapters';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 120 }).notNull(),
  passwordHash: varchar('password_hash', { length: 120 }),
  email: varchar('email', { length: 120 }).notNull(),
  emailVerified: timestamp('email_verified', { mode: 'date' }),
  image: text('image'),
  role: text('role', { enum: ['admin', 'user', 'moderator'] })
    .default('user')
    .notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('type').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state')
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId)
  })
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull()
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('indentifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull()
  },
  (vt) => ({ compoundKey: primaryKey(vt.identifier, vt.token) })
);

export const userRelations = relations(users, ({ one, many }) => ({
  userAddress: one(userAddress, {
    fields: [users.id],
    references: [userAddress.id]
  }),
  pets: many(pets)
}));

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export const userAddress = pgTable('user_address', {
  id: uuid('id').primaryKey().defaultRandom(),
  phone: varchar('phone', { length: 120 }),
  address: varchar('address', { length: 120 }),
  country: varchar('country', { length: 120 }),
  city: varchar('city', { length: 120 }),
  postalCode: varchar('postal_code', { length: 120 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
  // userId: integer('user_id').references(() => users.id, {
  // 	onDelete: 'cascade'
  // })
});

export type UserAddress = InferSelectModel<typeof userAddress>;
export type NewUserAddress = InferInsertModel<typeof userAddress>;

//   user_id     Int    @unique
//   user        User   @relation(fields: [user_id], references: [id])
// }

export const pets = pgTable('pets', {
  id: uuid('id').primaryKey().defaultRandom(),
  petName: varchar('pet-name', { length: 20 }).notNull(),
  country: varchar('country', { length: 20 }).notNull(),
  state: varchar('state', { length: 20 }).notNull(),
  breed: varchar('breed', { length: 30 }).notNull(),
  pureBred: varchar('pure-bred', { length: 30 }).notNull(),
  age: integer('age').notNull(),
  gender: varchar('gender', { length: 7 }).notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(), // update timestamp
  imgs: varchar('cloudinary_ids', { length: 120 })
    .array()
    .notNull()
    .$type<Array<string>>(), // array
  userId: uuid('user_id'),
  category: varchar('category', { length: 20 }).references(
    () => categories.name
  ),
  city: varchar('city', { length: 20 }).notNull()
});

export const petsRelations = relations(pets, ({ one }) => ({
  user: one(users, {
    fields: [pets.userId],
    references: [users.id]
  }),
  pets: one(categories, {
    fields: [pets.category],
    references: [categories.name]
  })
}));

export type Pet = InferSelectModel<typeof pets>;
export type NewPet = InferInsertModel<typeof pets>;

export const categories = pgTable('categories', {
  name: varchar('name', { length: 20 }).primaryKey()
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(pets)
}));

export type Categories = InferSelectModel<typeof categories>;
export type NewCategories = InferInsertModel<typeof categories>;
