import { execSync } from 'child_process';

const targetEnv = process.argv[2] || "";
const LoadEnvFilesCommand = `env-cmd -f .env.secret env-cmd -f .env.db.secret.${targetEnv} `;
const runCommand = `${targetEnv === "dev" ? "nodemon --legacy-watch" : "node"} src/index.js`;

try {
    execSync(LoadEnvFilesCommand + runCommand, { stdio: 'inherit' });
} catch (error) {
    console.error('Error while running the server:', error);
    process.exit(1);
}
