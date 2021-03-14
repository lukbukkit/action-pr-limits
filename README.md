# Limit Pull Requests
A GitHub action which limits pull requests to given branches.

## Inputs

You should at least specify one of the inputs, otherwise the usage of this action is pointless.
If both inputs are given the allowlist will be preferred.
You can use a full branch name or regular expression to match branch names.
The inputs `whitelist` and `blacklist` are deprecated.

### `allowlist`
A list of branches which are allowed to merge into another branch.

### `denylist`
A list of branches which aren't allowed to merge into another branch.

## Example usage
In this example action we want to limit the branches from which pull requests into the `main` branch can be created.
Just pull requests from the branches `development` and [`testing-v([\d.]+)`](https://regexr.com/5ohd9) 
to the `main` branch should be allowed.  
All other pull request, which aren't targeting `main` branch should also be allowed.

```yaml
name: Limit PRs

on:
  pull_request:
    branches:
      - main

jobs:
  limit_master_pr:
    runs-on: ubuntu-latest
    name: Limits PR to master
    steps:
      - name: Limit action step
        id: limit_action
        uses: LukBukkit/action-pr-limits@v1
        with:
          allowlist: |
            development
            testing-v([\d.]+)
```
