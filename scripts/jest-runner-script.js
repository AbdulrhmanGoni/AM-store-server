import { execSync } from 'child_process';

const runningTarget = process.argv[2] || "";

const command = `\
    SET NODE_ENV=jest-testing || export NODE_ENV=jest-testing && \
    env-cmd -f .env.secret node \
    --experimental-vm-modules node_modules/jest/bin/jest.js \
    --runInBand \
    --detectOpenHandles \
    --forceExit \
    -- ${runningTarget}
`;

try {
    execSync(command, { stdio: 'inherit', shell: 'bash' });
} catch (error) {
    console.error('Error executing Jest tests:', error);
    process.exit(1);
}
