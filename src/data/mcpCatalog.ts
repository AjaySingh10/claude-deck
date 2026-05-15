import { MCPServerConfig } from '../settingsManager';

export type MCPCategory = 'dev' | 'data' | 'productivity' | 'browser' | 'ai';

export interface MCPEnvVar {
  key: string;
  description: string;
  required: boolean;
  placeholder?: string;
}

export interface MCPEntry {
  id: string;
  name: string;
  serverKey: string;           // key used in settings.json mcpServers
  description: string;
  category: MCPCategory;
  icon: string;
  npm?: string;
  configTemplate: MCPServerConfig;
  envVars?: MCPEnvVar[];
  docsUrl?: string;
}

export const MCP_CATEGORIES: { id: MCPCategory; label: string; icon: string }[] = [
  { id: 'dev',          label: 'Dev Tools',    icon: '🔧' },
  { id: 'data',         label: 'Data',         icon: '🗄️' },
  { id: 'productivity', label: 'Productivity', icon: '📅' },
  { id: 'browser',      label: 'Browser',      icon: '🌐' },
  { id: 'ai',           label: 'AI / Search',  icon: '🤖' },
];

export const MCP_CATALOG: MCPEntry[] = [

  // ── DEV TOOLS ──────────────────────────────────────────────────────────

  {
    id: 'github',
    name: 'GitHub',
    serverKey: 'github',
    description: 'Read and write GitHub repos, issues, PRs, and comments directly from Claude.',
    category: 'dev',
    icon: '🐙',
    npm: '@modelcontextprotocol/server-github',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-github'],
      env: { GITHUB_PERSONAL_ACCESS_TOKEN: '' },
    },
    envVars: [
      { key: 'GITHUB_PERSONAL_ACCESS_TOKEN', description: 'GitHub PAT with repo scope', required: true, placeholder: 'ghp_...' },
    ],
    docsUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/github',
  },

  {
    id: 'linear',
    name: 'Linear',
    serverKey: 'linear',
    description: 'Query and create Linear issues, projects, and cycles from Claude.',
    category: 'dev',
    icon: '📐',
    npm: '@modelcontextprotocol/server-linear',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-linear'],
      env: { LINEAR_API_KEY: '' },
    },
    envVars: [
      { key: 'LINEAR_API_KEY', description: 'Linear API key from Settings → API', required: true, placeholder: 'lin_api_...' },
    ],
  },

  {
    id: 'gitlab',
    name: 'GitLab',
    serverKey: 'gitlab',
    description: 'Access GitLab repos, merge requests, issues, and pipelines.',
    category: 'dev',
    icon: '🦊',
    npm: '@modelcontextprotocol/server-gitlab',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-gitlab'],
      env: { GITLAB_PERSONAL_ACCESS_TOKEN: '', GITLAB_API_URL: 'https://gitlab.com' },
    },
    envVars: [
      { key: 'GITLAB_PERSONAL_ACCESS_TOKEN', description: 'GitLab personal access token', required: true, placeholder: 'glpat-...' },
      { key: 'GITLAB_API_URL', description: 'GitLab instance URL (change for self-hosted)', required: false, placeholder: 'https://gitlab.com' },
    ],
  },

  {
    id: 'jira',
    name: 'Jira',
    serverKey: 'jira',
    description: 'Read and update Jira tickets, sprints, and boards.',
    category: 'dev',
    icon: '🎫',
    npm: 'mcp-server-jira',
    configTemplate: {
      command: 'npx',
      args: ['-y', 'mcp-server-jira'],
      env: { JIRA_URL: '', JIRA_EMAIL: '', JIRA_API_TOKEN: '' },
    },
    envVars: [
      { key: 'JIRA_URL', description: 'Your Jira instance URL', required: true, placeholder: 'https://yourco.atlassian.net' },
      { key: 'JIRA_EMAIL', description: 'Your Atlassian account email', required: true, placeholder: 'you@company.com' },
      { key: 'JIRA_API_TOKEN', description: 'Atlassian API token from id.atlassian.com', required: true, placeholder: 'ATATT3...' },
    ],
  },

  {
    id: 'sentry',
    name: 'Sentry',
    serverKey: 'sentry',
    description: 'Query Sentry error events, issues, and stack traces directly from Claude.',
    category: 'dev',
    icon: '🪲',
    npm: '@modelcontextprotocol/server-sentry',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-sentry'],
      env: { SENTRY_AUTH_TOKEN: '', SENTRY_ORG: '' },
    },
    envVars: [
      { key: 'SENTRY_AUTH_TOKEN', description: 'Sentry auth token with project:read scope', required: true, placeholder: 'sntrys_...' },
      { key: 'SENTRY_ORG', description: 'Your Sentry organization slug', required: true, placeholder: 'my-org' },
    ],
  },

  {
    id: 'docker',
    name: 'Docker',
    serverKey: 'docker',
    description: 'List and inspect Docker containers, images, volumes, and compose stacks.',
    category: 'dev',
    icon: '🐳',
    npm: 'mcp-server-docker',
    configTemplate: {
      command: 'npx',
      args: ['-y', 'mcp-server-docker'],
    },
    envVars: [],
  },

  {
    id: 'vercel',
    name: 'Vercel',
    serverKey: 'vercel',
    description: 'View deployments, domains, environment variables, and logs on Vercel.',
    category: 'dev',
    icon: '▲',
    npm: 'mcp-vercel',
    configTemplate: {
      command: 'npx',
      args: ['-y', 'mcp-vercel'],
      env: { VERCEL_TOKEN: '' },
    },
    envVars: [
      { key: 'VERCEL_TOKEN', description: 'Vercel API token from Account Settings', required: true, placeholder: 'ver_...' },
    ],
  },

  // ── DATA ───────────────────────────────────────────────────────────────

  {
    id: 'filesystem',
    name: 'Filesystem',
    serverKey: 'filesystem',
    description: 'Give Claude read/write access to specific directories on your machine.',
    category: 'data',
    icon: '📁',
    npm: '@modelcontextprotocol/server-filesystem',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-filesystem', '/home'],
    },
    envVars: [],
    docsUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem',
  },

  {
    id: 'postgres',
    name: 'PostgreSQL',
    serverKey: 'postgres',
    description: 'Query and inspect your PostgreSQL database schema and data.',
    category: 'data',
    icon: '🐘',
    npm: '@modelcontextprotocol/server-postgres',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-postgres', 'postgresql://localhost/mydb'],
    },
    envVars: [],
  },

  {
    id: 'sqlite',
    name: 'SQLite',
    serverKey: 'sqlite',
    description: 'Read and write a local SQLite database file.',
    category: 'data',
    icon: '🗃️',
    npm: '@modelcontextprotocol/server-sqlite',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-sqlite', '--db-path', '/path/to/database.db'],
    },
    envVars: [],
  },

  {
    id: 'redis',
    name: 'Redis',
    serverKey: 'redis',
    description: 'Inspect and manipulate Redis keys, hashes, lists, and pub/sub channels.',
    category: 'data',
    icon: '🔴',
    npm: 'mcp-server-redis',
    configTemplate: {
      command: 'npx',
      args: ['-y', 'mcp-server-redis'],
      env: { REDIS_URL: 'redis://localhost:6379' },
    },
    envVars: [
      { key: 'REDIS_URL', description: 'Redis connection URL', required: false, placeholder: 'redis://localhost:6379' },
    ],
  },

  {
    id: 'mongodb',
    name: 'MongoDB',
    serverKey: 'mongodb',
    description: 'Query, inspect, and aggregate MongoDB collections directly from Claude.',
    category: 'data',
    icon: '🍃',
    npm: 'mcp-server-mongodb',
    configTemplate: {
      command: 'npx',
      args: ['-y', 'mcp-server-mongodb'],
      env: { MONGODB_URI: 'mongodb://localhost:27017' },
    },
    envVars: [
      { key: 'MONGODB_URI', description: 'MongoDB connection URI', required: true, placeholder: 'mongodb://localhost:27017/mydb' },
    ],
  },

  {
    id: 'mysql',
    name: 'MySQL',
    serverKey: 'mysql',
    description: 'Run queries and inspect schema on a MySQL or MariaDB database.',
    category: 'data',
    icon: '🐬',
    npm: 'mcp-server-mysql',
    configTemplate: {
      command: 'npx',
      args: ['-y', 'mcp-server-mysql'],
      env: { MYSQL_HOST: 'localhost', MYSQL_PORT: '3306', MYSQL_USER: 'root', MYSQL_PASSWORD: '', MYSQL_DATABASE: '' },
    },
    envVars: [
      { key: 'MYSQL_HOST', description: 'MySQL host', required: false, placeholder: 'localhost' },
      { key: 'MYSQL_USER', description: 'MySQL user', required: true, placeholder: 'root' },
      { key: 'MYSQL_PASSWORD', description: 'MySQL password', required: true, placeholder: '' },
      { key: 'MYSQL_DATABASE', description: 'Database name', required: true, placeholder: 'mydb' },
    ],
  },

  {
    id: 'elasticsearch',
    name: 'Elasticsearch',
    serverKey: 'elasticsearch',
    description: 'Search and inspect Elasticsearch indices, mappings, and documents.',
    category: 'data',
    icon: '🔎',
    npm: 'mcp-server-elasticsearch',
    configTemplate: {
      command: 'npx',
      args: ['-y', 'mcp-server-elasticsearch'],
      env: { ELASTICSEARCH_URL: 'http://localhost:9200' },
    },
    envVars: [
      { key: 'ELASTICSEARCH_URL', description: 'Elasticsearch base URL', required: true, placeholder: 'http://localhost:9200' },
      { key: 'ELASTICSEARCH_API_KEY', description: 'API key (if auth enabled)', required: false, placeholder: '' },
    ],
  },

  // ── PRODUCTIVITY ───────────────────────────────────────────────────────

  {
    id: 'slack',
    name: 'Slack',
    serverKey: 'slack',
    description: 'Read messages, post to channels, and search Slack from Claude.',
    category: 'productivity',
    icon: '💬',
    npm: '@modelcontextprotocol/server-slack',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-slack'],
      env: { SLACK_BOT_TOKEN: '', SLACK_TEAM_ID: '' },
    },
    envVars: [
      { key: 'SLACK_BOT_TOKEN', description: 'Slack Bot OAuth token', required: true, placeholder: 'xoxb-...' },
      { key: 'SLACK_TEAM_ID', description: 'Slack workspace team ID', required: true, placeholder: 'T0...' },
    ],
  },

  {
    id: 'notion',
    name: 'Notion',
    serverKey: 'notion',
    description: 'Read and write Notion pages, databases, and blocks.',
    category: 'productivity',
    icon: '📓',
    npm: '@modelcontextprotocol/server-notion',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-notion'],
      env: { NOTION_API_KEY: '' },
    },
    envVars: [
      { key: 'NOTION_API_KEY', description: 'Notion Internal Integration Token', required: true, placeholder: 'secret_...' },
    ],
  },

  {
    id: 'google-drive',
    name: 'Google Drive',
    serverKey: 'gdrive',
    description: 'Search, read, and export Google Drive files including Docs, Sheets, and Slides.',
    category: 'productivity',
    icon: '📂',
    npm: '@modelcontextprotocol/server-gdrive',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-gdrive'],
      env: { GOOGLE_APPLICATION_CREDENTIALS: '' },
    },
    envVars: [
      { key: 'GOOGLE_APPLICATION_CREDENTIALS', description: 'Path to service account JSON key file', required: true, placeholder: '/path/to/credentials.json' },
    ],
  },

  {
    id: 'google-calendar',
    name: 'Google Calendar',
    serverKey: 'google-calendar',
    description: 'Read and create Google Calendar events — useful for scheduling sprints and standups.',
    category: 'productivity',
    icon: '📆',
    npm: 'mcp-google-calendar',
    configTemplate: {
      command: 'npx',
      args: ['-y', 'mcp-google-calendar'],
      env: { GOOGLE_CALENDAR_CREDENTIALS: '' },
    },
    envVars: [
      { key: 'GOOGLE_CALENDAR_CREDENTIALS', description: 'Path to OAuth2 credentials JSON', required: true, placeholder: '/path/to/credentials.json' },
    ],
  },

  {
    id: 'confluence',
    name: 'Confluence',
    serverKey: 'confluence',
    description: 'Read and create Confluence pages and spaces — ideal for syncing specs and ADRs.',
    category: 'productivity',
    icon: '📚',
    npm: 'mcp-confluence',
    configTemplate: {
      command: 'npx',
      args: ['-y', 'mcp-confluence'],
      env: { CONFLUENCE_URL: '', CONFLUENCE_EMAIL: '', CONFLUENCE_API_TOKEN: '' },
    },
    envVars: [
      { key: 'CONFLUENCE_URL', description: 'Your Confluence base URL', required: true, placeholder: 'https://yourco.atlassian.net/wiki' },
      { key: 'CONFLUENCE_EMAIL', description: 'Atlassian account email', required: true, placeholder: 'you@company.com' },
      { key: 'CONFLUENCE_API_TOKEN', description: 'Atlassian API token', required: true, placeholder: 'ATATT3...' },
    ],
  },

  // ── BROWSER ────────────────────────────────────────────────────────────

  {
    id: 'puppeteer',
    name: 'Puppeteer',
    serverKey: 'puppeteer',
    description: 'Control a real browser — navigate, click, screenshot, and scrape pages.',
    category: 'browser',
    icon: '🎭',
    npm: '@modelcontextprotocol/server-puppeteer',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-puppeteer'],
    },
    envVars: [],
    docsUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer',
  },

  {
    id: 'playwright',
    name: 'Playwright',
    serverKey: 'playwright',
    description: 'Drive a Playwright browser for E2E testing, screenshots, and web scraping.',
    category: 'browser',
    icon: '🎬',
    npm: '@playwright/mcp',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@playwright/mcp'],
    },
    envVars: [],
    docsUrl: 'https://github.com/microsoft/playwright-mcp',
  },

  // ── AI / SEARCH ────────────────────────────────────────────────────────

  {
    id: 'brave-search',
    name: 'Brave Search',
    serverKey: 'brave-search',
    description: 'Real-time web and local search via Brave Search API — no Google tracking.',
    category: 'ai',
    icon: '🔍',
    npm: '@modelcontextprotocol/server-brave-search',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-brave-search'],
      env: { BRAVE_API_KEY: '' },
    },
    envVars: [
      { key: 'BRAVE_API_KEY', description: 'Brave Search API key (free tier available)', required: true, placeholder: 'BSA...' },
    ],
  },

  {
    id: 'memory-store',
    name: 'Memory Store',
    serverKey: 'memory',
    description: 'Persistent KV memory for Claude — store and retrieve facts across sessions using a knowledge graph.',
    category: 'ai',
    icon: '🧠',
    npm: '@modelcontextprotocol/server-memory',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-memory'],
    },
    envVars: [],
    docsUrl: 'https://github.com/modelcontextprotocol/servers/tree/main/src/memory',
  },

  {
    id: 'context7',
    name: 'Context7',
    serverKey: 'context7',
    description: 'Fetch up-to-date library docs and code examples — eliminates hallucinated API usage.',
    category: 'ai',
    icon: '📖',
    npm: '@upstash/context7-mcp',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@upstash/context7-mcp'],
    },
    envVars: [],
    docsUrl: 'https://github.com/upstash/context7',
  },

  {
    id: 'exa',
    name: 'Exa Search',
    serverKey: 'exa',
    description: 'AI-optimized semantic web search — great for research, docs lookup, and code examples.',
    category: 'ai',
    icon: '🔭',
    npm: 'exa-mcp-server',
    configTemplate: {
      command: 'npx',
      args: ['-y', 'exa-mcp-server'],
      env: { EXA_API_KEY: '' },
    },
    envVars: [
      { key: 'EXA_API_KEY', description: 'Exa API key from exa.ai dashboard', required: true, placeholder: '' },
    ],
  },

  {
    id: 'sequential-thinking',
    name: 'Sequential Thinking',
    serverKey: 'sequential-thinking',
    description: 'Adds a structured thinking tool for dynamic multi-step reasoning on complex problems.',
    category: 'ai',
    icon: '🔗',
    npm: '@modelcontextprotocol/server-sequential-thinking',
    configTemplate: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-sequential-thinking'],
    },
    envVars: [],
  },
];
