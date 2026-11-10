import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  timestamp,
  varchar,
  unique
} from 'drizzle-orm/mysql-core';

//  Établissements, facultés, départements 

export const etablissement = mysqlTable('etablissement', {
  id: int().primaryKey().autoincrement(),
  nom: varchar({ length: 100 }).notNull(),
  adresse: varchar({ length: 255 }).notNull(),
  code_postal: varchar({ length: 10 }).notNull(),
  ville: varchar({ length: 100 }).notNull(),
  code_rne: varchar({ length: 8 }).notNull().unique(),
});



// Utilisateurs 

export const utilisateur = mysqlTable('utilisateur', {
  id: int().primaryKey().autoincrement(),
  nom: varchar({ length: 100 }).notNull(),
  prenom: varchar({ length: 100 }).notNull(),
  nom_utilisateur: varchar({ length: 100 }).notNull(),
  mdp: varchar({ length: 255 }).notNull(),
  mail: varchar({ length: 255 }).notNull().unique(),
  role: mysqlEnum(['professeur', 'etudiant', 'admin'])
    .default('etudiant')
    .notNull(),
  id_etablissement: int().references(() => etablissement.id, {
    onDelete: 'set null',
  }),
});

//Cours, modules, chapitres, thèmes

export const faculte = mysqlTable('faculte', {
  id: int().primaryKey().autoincrement(),
  nom: varchar({ length: 100 }).notNull(),
  id_etablissement: int()
    .notNull()
    .references(() => etablissement.id, { onDelete: 'cascade' }),
});

export const departement = mysqlTable('departement', {
  id: int().primaryKey().autoincrement(),
  nom: varchar({ length: 100 }).notNull(),
  id_faculte: int()
    .notNull()
    .references(() => faculte.id, { onDelete: 'cascade' }),
});

export const cours = mysqlTable('cours', {
  id: int().primaryKey().autoincrement(),
  nom: varchar({ length: 100 }).notNull(),
  id_faculte: int().references(() => faculte.id, { onDelete: 'set null' }),
});

export const module_cours = mysqlTable('module_cours', {
  id: int().primaryKey().autoincrement(),
  nom: varchar({ length: 100 }).notNull(),
  id_cours: int()
    .notNull()
    .references(() => cours.id, { onDelete: 'cascade' }),
});

export const chapitre = mysqlTable('chapitre', {
  id: int().primaryKey().autoincrement(),
  nom: varchar({ length: 100 }).notNull(),
  id_module: int()
    .notNull()
    .references(() => module_cours.id, { onDelete: 'cascade' }),
});

export const theme = mysqlTable('theme', {
  id: int().primaryKey().autoincrement(),
  nom: varchar({ length: 100 }).notNull(),
  id_chapitre: int()
    .notNull()
    .references(() => chapitre.id, { onDelete: 'cascade' }),
});

// Un module peut avoir plusieurs prérequis (un autre module par ligne)
export const prerequis = mysqlTable('prerequis', {
  id_module: int()
    .notNull()
    .references(() => module_cours.id, { onDelete: 'cascade' }),
  id_prerequis: int()
    .notNull()
    .references(() => module_cours.id, { onDelete: 'cascade' }),
},
  (table) => [primaryKey({ columns: [table.id_module, table.id_prerequis] })],
);

export const element_cours = mysqlTable('element_cours', {
  id: int().primaryKey().autoincrement(),
  titre: varchar({ length: 100 }),
  type: mysqlEnum(['texte', 'image']).notNull(),
  contenu: text(),
  description: text(),
  credit: varchar({ length: 100 }),
  licence: varchar({ length: 100 }),
  id_cours: int()
    .notNull()
    .references(() => cours.id, { onDelete: 'cascade' }),
  id_auteur: int()
    .notNull()
    .references(() => utilisateur.id),
  created_at: timestamp().defaultNow().notNull(),
});

// favori par un utilisateur
export const favori = mysqlTable(
  'favori',
  {
    id: int().primaryKey().autoincrement(),
    id_utilisateur: int()
      .notNull()
      .references(() => utilisateur.id, { onDelete: 'cascade' }),

    id_cours: int().references(() => cours.id, { onDelete: 'cascade' }),
    id_module: int().references(() => module_cours.id, { onDelete: 'cascade' }),
    id_chapitre: int().references(() => chapitre.id, { onDelete: 'cascade' }),
    id_theme: int().references(() => theme.id, { onDelete: 'cascade' }),
    id_departement: int().references(() => departement.id, { onDelete: 'cascade' }),

    created_at: timestamp().defaultNow().notNull(),
  },
  (t) => [
    unique('uq_favori_cours').on(t.id_utilisateur, t.id_cours),
    unique('uq_favori_module').on(t.id_utilisateur, t.id_module),
    unique('uq_favori_chapitre').on(t.id_utilisateur, t.id_chapitre),
    unique('uq_favori_theme').on(t.id_utilisateur, t.id_theme),
    unique('uq_favori_departement').on(t.id_utilisateur, t.id_departement),
  ],
);

//Exercices, questions, propositions 

export const exercice = mysqlTable('exercice', {
  id: int().primaryKey().autoincrement(),
  titre: varchar({ length: 100 }).notNull(),
});


export const proposition = mysqlTable('proposition', {
  id: int().primaryKey().autoincrement(),
  id_question: int()
    .notNull()
    .references(() => question.id, { onDelete: 'cascade' }),
  contenu: varchar({ length: 255 }).notNull(),
  est_vraie: boolean().notNull().default(false),
});

export const groupe_question = mysqlTable('groupe_question',
  {
    id: int().primaryKey().autoincrement(),
    id_exercice: int()
      .notNull()
      .references(() => exercice.id, { onDelete: 'cascade' }),
    position: int().notNull(),
  },
  (t) => [unique('uq_groupe_position').on(t.id_exercice, t.position)],
);

export const question = mysqlTable('question',
  {
    id: int().primaryKey().autoincrement(),
    id_groupe: int()
      .notNull()
      .references(() => groupe_question.id, { onDelete: 'cascade' }),
    position: int().notNull(),
    id_module: int()
      .notNull()
      .references(() => module_cours.id),
    enonce: text().notNull(),
    media: varchar({ length: 255 }),
    points: int(),
    difficulte: int(),
  },
  (t) => [unique('uq_question_position').on(t.id_groupe, t.position)],
);