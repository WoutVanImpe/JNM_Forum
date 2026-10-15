import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("auth0_id").notNullable().unique();
      table.string("name").notNullable();
      table.string("age_group").notNullable();
      table.string("department").notNullable();
      table.string("profile_picture").nullable();
      table.string("onesignal_device_id").nullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("functions", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable().unique();
    })

    .createTable("user_functions", (table) => {
      table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
      table.integer("function_id").references("id").inTable("functions").onDelete("CASCADE");
      table.primary(["user_id", "function_id"]);
    })

    .createTable("categories", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("category_permissions", (table) => {
      table.integer("category_id").references("id").inTable("categories").onDelete("CASCADE");
      table.integer("function_id").references("id").inTable("functions").onDelete("CASCADE");
      table.boolean("can_view").defaultTo(true);
      table.boolean("can_manage").defaultTo(false);
      table.boolean("is_admin").defaultTo(false);
      table.primary(["category_id", "function_id"]);
    })

    .createTable("channels", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.enum("type", ["chat", "thread", "broadcast"]).notNullable();
      table.integer("category_id").references("id").inTable("categories").onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })

    .createTable("channel_publishers", (table) => {
      table.integer("channel_id").references("id").inTable("channels").onDelete("CASCADE");
      table.integer("function_id").references("id").inTable("functions").onDelete("CASCADE");
      table.primary(["channel_id", "function_id"]);
    })

    .createTable("channel_permissions", (table) => {
      table.integer("channel_id").references("id").inTable("channels").onDelete("CASCADE");
      table.integer("function_id").references("id").inTable("functions").onDelete("CASCADE");
      table.boolean("can_view").defaultTo(true);
      table.boolean("can_manage").defaultTo(false);
      table.boolean("is_admin").defaultTo(false);
      table.primary(["channel_id", "function_id"]);
    })

    .createTable("channel_reads", (table) => {
      table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
      table.integer("channel_id").references("id").inTable("channels").onDelete("CASCADE");
      table.timestamp("last_read_at").defaultTo(knex.fn.now());
      table.primary(["user_id", "channel_id"]);
    })

    .createTable("messages", (table) => {
      table.increments("id").primary();
      table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
      table.integer("channel_id").references("id").inTable("channels").onDelete("CASCADE");
      table.text("content").notNullable();
      table.integer("quoted_message_id").nullable().references("id").inTable("messages").onDelete("SET NULL");
      table.integer("parent_message_id").nullable().references("id").inTable("messages").onDelete("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists("messages")
    .dropTableIfExists("channel_reads")
    .dropTableIfExists("channel_permissions")
    .dropTableIfExists("channel_publishers")
    .dropTableIfExists("channels")
    .dropTableIfExists("category_permissions")
    .dropTableIfExists("categories")
    .dropTableIfExists("user_functions")
    .dropTableIfExists("functions")
    .dropTableIfExists("users");
}