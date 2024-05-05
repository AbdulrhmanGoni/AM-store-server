import { execSync } from 'child_process';

const runningTarget = process.argv[2] || "";

const command = `\
    env-cmd -f .env.testing node \
    --experimental-vm-modules node_modules/jest/bin/jest.js \
    --runInBand \
    --detectOpenHandles \
    --forceExit \
    --bail \
    -- ${runningTarget}
`;

try {
    execSync(command, { stdio: 'inherit' });
} catch (error) {
    console.error('Error executing Jest tests:');
    process.exit(1);
}
