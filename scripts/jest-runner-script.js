import { execSync } from 'child_process';

const runningTarget = process.argv[2] || "";

const command = `\
    env-cmd -f .env.secret env-cmd -f .env.jest-testing node \
    --experimental-vm-modules node_modules/jest/bin/jest.js \
    --runInBand \
    --detectOpenHandles \
    --forceExit \
    -- ${runningTarget}
`;

try {
    execSync(command, { stdio: 'inherit', shell: 'bash' });
} catch (error) {
    console.error('Error executing Jest tests:');
    process.exit(1);
}
