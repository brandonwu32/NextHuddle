import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
  TeamField,
  TaskForm,
  DeveloperTable,
  TaskTable,
  User,
  Developer,
  Team,
  TeamTableType,
  ImportantLink,
} from './definitions';
import { formatCurrency } from './utils';

/*
export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}
*/

export async function fetchImportantLinks() {
  noStore();
  try {
    const data = await sql<ImportantLink>`
      SELECT links.id, links.name, links.url
      FROM links;`
      ;

    const importantLinks = data.rows.map((link) => ({
      ...link,
    }));
    return importantLinks;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch important links.');
  }
}


export async function fetchCardData() { //total, completed, pending, backlogged
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const taskCountPromise = sql`SELECT COUNT(*) FROM tasks`;
    const completedCountPromise = sql`SELECT
      COUNT(*)
      FROM tasks
      WHERE status = 'completed' `;
    const pendingCountPromise = sql`SELECT
      COUNT(*)
      FROM tasks
      WHERE status = 'pending' `
    const backlogCountPromise = sql`SELECT
      COUNT(*)
      FROM tasks
      WHERE status = 'backlog' `
    const data = await Promise.all([
      taskCountPromise,
      completedCountPromise,
      pendingCountPromise,
      backlogCountPromise,
    ]);

    const numberOfTasks = Number(data[0].rows[0].count ?? '0');
    const numberOfCompletedTasks = Number(data[1].rows[0].count ?? '0');
    const numberOfPendingTasks = Number(data[2].rows[0].count ?? '0');
    const numberOfBacklogTasks = Number(data[3].rows[0].count ?? '0');

    return {
      numberOfTasks,
      numberOfCompletedTasks,
      numberOfPendingTasks,
      numberOfBacklogTasks,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}




const ITEMS_PER_PAGE = 6;
export async function fetchFilteredTasks( // use to search on the tasks page
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const sortTable = {
      'date': 'tasks.date',
      'name': 'tasks.name',
      'team_name': 'team.name',
      'status': 'tasks.status'
    }
    const tasks = await sql<TaskTable>`
      SELECT
        tasks.id,
        tasks.name AS name,
        tasks.date AS date,
        tasks.status AS status,
        teams.name AS team_name,
        teams.id,
        tasks.notes AS notes
      FROM tasks
      JOIN teams ON tasks.team_id = teams.id
      WHERE
        teams.name ILIKE ${`%${query}%`} OR
        tasks.notes ILIKE ${`%${query}%`} OR
        tasks.date::text ILIKE ${`%${query}%`} OR
        tasks.status ILIKE ${`%${query}%`}
      ORDER BY tasks.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return tasks.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tasks.');
  }
}

// don't need to track tasks completed by dev
/*
export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}
*/

export async function fetchTaskById(id: string) { // use to edit the details of the form
  noStore();
  try {
    const data = await sql<TaskForm>`
      SELECT
        tasks.id,
        tasks.customer_id,
        tasks.amount,
        tasks.status
      FROM tasks
      WHERE tasks.id = ${id};
    `;

    const tasks = data.rows.map((task) => ({
      ...task,
    }));

    return tasks[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch task.');
  }
}

export async function fetchTeamsPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM teams
    WHERE
      teams.name ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tasks.');
  }
}

export async function fetchDevelopersPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM developers
    WHERE
      developers.name ILIKE ${`%${query}%`} OR
      developers.email ILIKE ${`%${query}%`} OR
      developers.phone ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of developers.');
  }
}

export async function fetchNumberTeams() {
  noStore();
  try {
    const data = await sql<TeamField>`
      SELECT
        id,
        name
      FROM teams
      ORDER BY name ASC
    `;

    const teams = data.rows;
    return teams;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all teams.');
  }
}
// should show team name, team members, total pending tasks
export async function fetchFilteredTeams(
    query: string,
    currentPage: number,) {
  noStore();
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const data = await sql<TeamTableType>`
    WITH t1 AS (
      SELECT teams.id, MIN(teams.active) AS active, MIN(teams.name) AS name, STRING_AGG(developers.name, ' | ') AS members
      FROM teams
      JOIN developers ON teams.id = developers.team_id
      WHERE teams.name ILIKE ${`%${query}%`} OR
      developers.name ILIKE ${`%${query}%`}
      GROUP BY teams.id
    )
		SELECT
      t1.id,
		  t1.name,
      MIN(t1.active) AS active,
      t1.members,
		  SUM(CASE WHEN tasks.status = 'pending' THEN 1 ELSE 0 END) AS pending_tasks,
      COUNT(*) AS total_tasks
		FROM t1
		JOIN tasks ON t1.id = tasks.team_id
    WHERE tasks.name ILIKE ${`%${query}%`} OR
      t1.name ILIKE ${`%${query}%`} OR
      t1.members ILIKE ${`%${query}%`}
    GROUP BY t1.name, t1.id, t1.members
    ORDER BY t1.name
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;
    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch teams table.');
  }
}


export async function fetchTasksPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tasks
    JOIN teams ON teams.id = tasks.team_id
    WHERE
      teams.name ILIKE ${`%${query}%`} OR
      tasks.notes ILIKE ${`%${query}%`} OR
      tasks.date::text ILIKE ${`%${query}%`} OR
      tasks.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tasks.');
  }
}

export async function fetchFilteredDevelopers(query: string, currentPage: number) {
  noStore();
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const data = await sql<DeveloperTable>`
		SELECT
		  developers.id,
		  developers.name,
      teams.name AS team_name,
      developers.image_url AS profile
		FROM developers
		LEFT JOIN teams ON teams.id = developers.team_id
		WHERE
		  teams.name ILIKE ${`%${query}%`} OR
      developers.name ILIKE ${`%${query}%`}
		ORDER BY developers.name ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;

    const developers = data.rows.map((developer) => ({
      ...developer,
    }));

    return developers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch developers table.');
  }
}

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
