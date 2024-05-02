import { execSync } from 'child_process';

const runningContainersCommand = `\
docker-compose -f docker-compose-mongodb-replSet.yml up -d
`;
const initiateReplicasSetCommand = `\
docker exec mongodbPrimary-container bash ./scripts/initialize-mongodb-replSet.sh
`;

function run(command) {
    execSync(command, { stdio: 'inherit' });
}

try {
    run(runningContainersCommand);

    let tries = 6;
    setInterval(() => {
        if (tries) {
            try {
                tries--;
                run(initiateReplicasSetCommand);
                process.exit(0);
            } catch (e) {
                console.log("Failed to connect to the primary database");
                console.log("Retrying...\n");
            }
        } else {
            process.exit(1);
        }
    }, 2000);
} catch (error) {
    console.log(error);
    process.exit(1);
}
