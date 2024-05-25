const { db } = require('@vercel/postgres');
const {
  tasks,
  developers,
  teams,
  users,
  links,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        admin BOOLEAN NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password, admin)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.admin})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedTasks(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS tasks (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      team_id UUID NOT NULL,
      status VARCHAR(255) NOT NULL,
      notes VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      date DATE NOT NULL
  );
`;

    console.log(`Created "tasks" table`);

    // Insert data into the "invoices" table
    const insertedTasks = await Promise.all(
      tasks.map(
        (task) => client.sql`
        INSERT INTO tasks (id, team_id, name, status, notes, date)
        VALUES (${task.id}, ${task.team_id}, ${task.name}, ${task.status}, ${task.notes}, ${task.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedTasks.length} tasks`);

    return {
      createTable,
      tasks: insertedTasks,
    };
  } catch (error) {
    console.error('Error seeding tasks:', error);
    throw error;
  }
}

async function seedTeams(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "teams" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS teams (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        active VARCHAR(255) NOT NULL
      );
    `;
    console.log(`Created "teams" table`);

    // Insert data into the "teams" table
    const insertedTeams = await Promise.all(
      teams.map(
        (team) => client.sql`
        INSERT INTO teams (id, name, active)
        VALUES (${team.id}, ${team.name}, ${team.active})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedTeams.length} teams`);

    return {
      createTable,
      teams: insertedTeams,
    };
  } catch (error) {
    console.error('Error seeding teams:', error);
    throw error;
  }
}

async function seedDevelopers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "developers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS developers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        team_id UUID NOT NULL,
        email TEXT NOT NULL UNIQUE,
        image_url VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "developers" table`);

    // Insert data into the "developers" table
    const insertedDevelopers = await Promise.all(
      developers.map(
        (developer) => client.sql`
        INSERT INTO developers (id, name, team_id, email, image_url, phone)
        VALUES (${developer.id}, ${developer.name}, ${developer.team_id}, ${developer.email}, ${developer.image_url}, ${developer.phone})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedDevelopers.length} developers`);

    return {
      createTable,
      developers: insertedDevelopers,
    };
  } catch (error) {
    console.error('Error seeding developers:', error);
    throw error;
  }
}

async function seedImportantLinks(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "links" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS links (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        url TEXT NOT NULL UNIQUE
      );
    `;

    console.log(`Created "links" table`);

    // Insert data into the "links" table
    const insertedLinks = await Promise.all(
      links.map(
        (link) => client.sql`
        INSERT INTO links (id, name, url)
        VALUES (${link.id}, ${link.name}, ${link.url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedLinks.length} links`);

    return {
      createTable,
      links: insertedLinks,
    };
  } catch (error) {
    console.error('Error seeding links:', error);
    throw error;
  }
}

// async function seedRevenue(client) {
//   try {
//     // Create the "revenue" table if it doesn't exist
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS revenue (
//         month VARCHAR(4) NOT NULL UNIQUE,
//         revenue INT NOT NULL
//       );
//     `;

//     console.log(`Created "revenue" table`);

//     // Insert data into the "revenue" table
//     const insertedRevenue = await Promise.all(
//       revenue.map(
//         (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedRevenue.length} revenue`);

//     return {
//       createTable,
//       revenue: insertedRevenue,
//     };
//   } catch (error) {
//     console.error('Error seeding revenue:', error);
//     throw error;
//   }
// }

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedTasks(client);
  await seedTeams(client);
  await seedDevelopers(client);
  await seedImportantLinks(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
