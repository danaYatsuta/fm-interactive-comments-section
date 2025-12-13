import postgres from "postgres";

import { comments, users } from "@/app/reset-db/seed-data";

const sql = postgres(process.env.POSTGRES_URL as string, {
  ssl: process.env.NODE_ENV === "production" ? "verify-full" : false,
});

export async function GET() {
  try {
    await dropTables();
    await seedUsers();
    await seedComments();
    await createTriggers();

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

async function createTriggers() {
  await sql`
    CREATE TRIGGER mdt_users
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE PROCEDURE moddatetime (updated_at);
  `;

  await sql`
    CREATE TRIGGER mdt_comments
      BEFORE UPDATE ON comments
      FOR EACH ROW
      EXECUTE PROCEDURE moddatetime (updated_at);
  `;
}

async function dropTables() {
  await sql`DROP TABLE IF EXISTS users,comments;`;
}

async function seedComments() {
  await sql`
    CREATE TABLE comments (
      id SERIAL PRIMARY KEY,

      content TEXT NOT NULL,
      score INTEGER NOT NULL,
      user_id INTEGER NOT NULL REFERENCES users(id),

      is_reply BOOLEAN NOT NULL,
      parent_comment_id INTEGER REFERENCES comments(id),
      replying_to_comment_id INTEGER REFERENCES comments(id),
      
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT clock_timestamp(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT clock_timestamp()

      CHECK (
        (is_reply = FALSE AND parent_comment_id IS NULL AND replying_to_comment_id IS NULL)
        OR
        (is_reply = TRUE AND parent_comment_id IS NOT NULL AND replying_to_comment_id IS NOT NULL)
      )
    );
  `;

  comments.forEach(async (comment) => {
    if (
      comment.is_reply &&
      comment.parent_comment_id &&
      comment.replying_to_comment_id
    ) {
      await sql`
        INSERT INTO comments (content, score, user_id, is_reply, parent_comment_id, replying_to_comment_id, created_at, updated_at)
        VALUES (${comment.content}, ${comment.score}, ${comment.user_id}, ${comment.is_reply}, ${comment.parent_comment_id}, ${comment.replying_to_comment_id}, ${comment.created_at}, ${comment.created_at});
      `;
    } else {
      await sql`
        INSERT INTO comments (content, score, user_id, is_reply, created_at, updated_at)
        VALUES (${comment.content}, ${comment.score}, ${comment.user_id}, ${comment.is_reply}, ${comment.created_at}, ${comment.created_at});
      `;
    }
  });
}

async function seedUsers() {
  await sql`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,

      user_avatar VARCHAR(255),
      username VARCHAR(32) NOT NULL,

      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT clock_timestamp(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT clock_timestamp()
    );
  `;

  users.forEach(async (user) => {
    await sql`
      INSERT INTO users (id, user_avatar, username)
      VALUES (${user.id}, ${user.user_avatar}, ${user.username});
    `;
  });
}
