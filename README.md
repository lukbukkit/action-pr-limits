# Limit Pull Requests
A GitHub action which limits pull requests to given branches.

## Inputs

You should at least specify one of the inputs, otherwise the usage of this action is pointless.
If both inputs are given the whitelist, will be used.

### `whitelist`
A list of branches which are allowed to merge into another branch.

### `blacklist`
A list of branches which aren't allowed to merge into another branch.


## Example usage
In this example action we want to limit the branches from which pull requests into the `master` branch can be created.
Just pull requests from the branches `development` and `testing` to the `master` branch should be allowed.  
All other pull request, which aren't targeting `master` should also be allowed.

```yaml
on:
  pull_request:
    branches:
      - master

jobs:
  limit_master_pr:
    runs-on: ubuntu-latest
    name: Limits PR to master
    steps:
      - name: Limit action step
        id: limit_action
        uses: LukBukkit/action-pr-limits@v1
        with:
          whitelist: |
            development
            testing
```