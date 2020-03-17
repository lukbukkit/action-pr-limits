"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
function getInputs(name) {
    const input = core.getInput(name);
    if (!input) {
        return [];
    }
    return input
        .split('\n')
        .filter(str => str !== '')
        .map(str => str.toLowerCase());
}
function main() {
    if (github.context.eventName !== "pull_request") {
        core.warning(`This action should only run, when the event is a pull request, ` +
            `but it's a ${github.context.eventName}`);
        return;
    }
    const allowedBranches = getInputs('whitelist');
    const forbiddenBranches = getInputs('blacklist');
    handlePullRequest(allowedBranches, forbiddenBranches);
}
function handlePullRequest(allowedBranches, forbiddenBranches) {
    if (allowedBranches.length > 0 && forbiddenBranches.length > 0) {
        core.warning("You should either specify a whitelist (allowedBranches) or a blacklist (forbiddenBranches). " +
            "Not both at the same time! The whitelist will be used in this case.");
    }
    else if (allowedBranches.length == 0 && forbiddenBranches.length == 0) {
        core.warning("Both the white- and the blacklist are empty.");
    }
    let pullRequest = github.context.payload;
    const baseRef = pullRequest.pull_request.base.ref.toLowerCase();
    const headRef = pullRequest.pull_request.head.ref.toLowerCase();
    core.info(`Pull request #${pullRequest.number}: ${baseRef} -> ${headRef}`);
    core.info(`Allowed Branches: ${JSON.stringify(allowedBranches)}`);
    core.info(`Forbidden Branches: ${JSON.stringify(forbiddenBranches)}`);
    const foundForbidden = forbiddenBranches.find(branch => branch === headRef);
    const foundAllowed = allowedBranches.find(branch => branch === headRef);
    if (allowedBranches.length > 0) {
        if (foundAllowed) {
            core.info(`The pull request is allowed. Branch '${baseRef}' has been found on the whitelist.`);
        }
        else {
            core.error(`The pull request is forbidden. Branch '${baseRef}' hasn't been found on the whitelist.`);
            core.setFailed(`Head branch '${baseRef}' hasn't been found on the whitelist for '${headRef}'.`);
        }
        return;
    }
    if (forbiddenBranches.length > 0) {
        if (foundForbidden) {
            core.error(`The pull request is forbidden. Branch '${baseRef}' has been found on the blacklist.`);
            core.setFailed(`Head branch '${baseRef}' has been found on the blacklist for '${headRef}'.`);
        }
        else {
            core.info(`The pull request is allowed. Branch '${baseRef}' hasn't been found on the blacklist.`);
        }
        return;
    }
}
main();
