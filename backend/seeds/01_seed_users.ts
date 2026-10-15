import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Maak de tabel eerst leeg
  await knex("users").del();

  // Voeg testdata toe
  await knex("users").insert([
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
  ]);
}