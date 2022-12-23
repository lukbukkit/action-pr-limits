# Limit Pull Requests
A GitHub action which limits pull requests to given branches.

## Inputs

You should at least specify one of the inputs, otherwise the usage of this action is pointless.
If both inputs are given, the allowlist will be preferred.
You can use a full branch name or regular expression to match branch names.
The inputs `whitelist` and `blacklist` are deprecated.

### `allowlist`
A list of branches which are allowed to merge into the current branch.

### `denylist`
A list of branches which aren't allowed to merge into the current branch.

### `local`
A boolean flag to only accept pull requests from the repository under the given rules.
If `true` only pull request from this repository matching the requirements will be accepted. 
If `false` pull requests from all repositories (e.g. forks) matching the requirements will be accepted. 
Accepted values are `true` or `false`, the default is `false`.

## Example usage
In this example action we want to limit the branches from which pull requests into the `main` branch can be created.
Only pull requests from the branches `development` and [`testing-v([\d.]+)`](https://regexr.com/5ohd9) 
to the `main` branch should be allowed.  
All other pull request, which aren't targeting `main` branch should also be allowed.

```yaml
name: Limit PRs

on:
  pull_request:
    branches:
      - main

jobs:
  limit_main_pr:
    runs-on: ubuntu-latest
    steps:
      - uses: LukBukkit/action-pr-limits@v1
        with:
          allowlist: |
            development
            testing-v([\d.]+)
```
