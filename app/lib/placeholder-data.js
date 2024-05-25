// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Developer',
    email: 'developer@nextmail.com',
    password: '123456',
    admin: true,
  },
  {
    id: '410544b2-4004-4271-9855-fec4b6a6442a',
    name: 'Client',
    email: 'client@nextmail.com',
    password: '123456',
    admin: false,
  }
];

const teams = [
  {
    id: '3958dc9e-4377-712f-85e9-fec4b6a6442a',
    name: 'Team One',
    active: '1',
  },
  {
    id: '3958dc9e-4311-712f-85e9-fec4b6a6442a',
    name: 'Team Two',
    active: '0',

  },
  {
    id: '3958dc9e-4355-712f-85e9-fec4b6a6442a',
    name: 'Team Three',
    active: '1',
  }
];

const developers = [
  {
    id: '4058dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Brandon Wu',
    team_id: teams[0].id,
    email: 'bw@berkeley.edu',
    phone: '626-427-5314',
    image_url: '/customers/brandonwu.png',
  },
  {
    id: '4158dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Tanya Bhakhri',
    team_id: teams[1].id,
    email: 'tb@berkeley.edu',
    phone: '626-427-5314',
    image_url: '/customers/tanyabhakhri.png',
  },
  {
    id: '4258dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Enya Do',
    team_id: teams[2].id,
    email: 'ed@berkeley.edu',
    phone: '626-427-5314',
    image_url: '/customers/enyado.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Jiajun Liu',
    team_id: teams[0].id,
    email: 'jiajunliu@berkeley.edu',
    phone: '626-427-5314',
    image_url: '/customers/jiajunliu.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Liliana Rojas',
    team_id: teams[1].id,
    email: 'lilianarojas@berkeky.edu',
    phone: '626-427-5314',
    image_url: '/customers/lilianarojas.png',
  },
  {
    id: '44d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Rayyan Saiyed',
    team_id: teams[2].id,
    email: 'rayyansaiyed@berkeley.edu',
    phone: '626-427-5314',
    image_url: '/customers/rayyansaiyed.png',
  },
  {
    id: '45d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Bailey Segall',
    team_id: teams[0].id,
    email: 'baileysegall@berkeley.edu',
    phone: '626-427-5314',
    image_url: '/customers/baileysegall.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Kennedy Chung',
    team_id: teams[1].id,
    email: 'kennedychung@berkeley.edu',
    phone: '626-427-5314',
    image_url: '/customers/kennedychung.png',
  }
];

const tasks = [
  {
    id:'126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    team_id: teams[0].id,
    name: "Bug",
    status: 'pending',
    date: '2022-12-06',
    notes: 'almost done',
  },
  {
    id:'116eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    team_id: teams[1].id,
    name: "Bug",
    status: 'pending',
    date: '2022-11-14',
    notes: 'almost done but I want to write a little more for testing reasons',
  },
  {
    id:'106eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    team_id: teams[2].id,
    name: "Bug",
    status: 'completed',
    date: '2022-10-29',
    notes: 'almost done',
  },
  {
    id:'906eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    team_id: teams[2].id,
    name: "Bug",
    status: 'completed',
    date: '2023-09-10',
    notes: 'almost done',
  },
  {
    id:'896eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    team_id: teams[1].id,
    name: "Bug",
    status: 'todo',
    date: '2023-08-05',
    notes: 'almost done',
  },
  {
    id:'886eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    team_id: teams[2].id,
    name: "Bug",
    status: 'todo',
    date: '2023-07-16',
    notes: 'almost done',
  },
  {
    id:'876eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    team_id: teams[1].id,
    name: "Bug",
    status: 'todo',
    date: '2023-06-27',
    notes: 'almost done',
  },
  {
    id:'866eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    team_id: teams[0].id,
    name: "Bug",
    status: 'archived',
    date: '2023-06-09',
    notes: 'almost done',
  },
  {
    id:'856eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    team_id: teams[2].id,
    name: "Bug",
    status: 'archived',
    date: '2023-06-17',
    notes: 'almost done',
  },
  {
    id:'846eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    team_id: teams[1].id,
    name: "Bug",
    status: 'backlog',
    date: '2023-06-07',
    notes: 'almost done',
  },
  {
    id:'836eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    team_id: teams[1].id,
    name: "Bug",
    status: 'backlog',
    date: '2023-08-19',
    notes: 'almost done',
  }
];

const links = [
  {
    id: '420544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Zoom',
    url: 'https://zoom.us',
  },
  {
    id: '440544b2-4004-4271-9855-fec4b6a6442a',
    name: 'notion',
    url: 'https://www.notion.so/berkeleycodebase/mentored-sp23-6b4e01211a284006be1ef7c42d067896',
  }
];

module.exports = {
  users,
  developers,
  tasks,
  teams,
  links
};
