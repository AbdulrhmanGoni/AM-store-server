import { execSync } from 'child_process';
import { mkdirSync, readFileSync, writeFileSync, unlinkSync } from 'fs';
import { setFailed } from '@actions/core';

const executeOptions = { stdio: 'inherit', shell: 'bash' }

const collectingDir = "deploy-tests-code-coverage-report";
mkdirSync(collectingDir);

// Extract the needed data from `coverage-summary.json` file. 
const coverageSummary = readFileSync("coverage/coverage-summary.json", { encoding: "utf8" });
const codeCoverageTotal = JSON.parse(coverageSummary).total;
writeFileSync(`${collectingDir}/total-code-coverage.json`, JSON.stringify(codeCoverageTotal));

// Create code coverage badges image
try {
    execSync(`npm run create-coverage-badges --output ${collectingDir}/`, executeOptions);
} catch (error) {
    setFailed('Error while creating tests code coverage badges image:', error);
}

// Delete "coverage-summary.json" file
unlinkSync("coverage/coverage-summary.json");

// Move the neede files into collecting folder
const movingFilesCommands = `mv coverage/* ${collectingDir}`;
try {
    execSync(movingFilesCommands, executeOptions);
} catch (error) {
    setFailed(`Error while moving the neede files into "${collectingDir}" folder:`, error);
}
