enum ListResult {
    ON_LIST,
    NOT_ON_LIST,
    EMPTY_LIST,
}

function listContains(branch: string, list: string[]): ListResult {
    if (list.length == 0)
        return ListResult.EMPTY_LIST;

    if (list.some(item => new RegExp(`^${item}$`).test(branch))) {
        return ListResult.ON_LIST;
    } else {
        return ListResult.NOT_ON_LIST;
    }
}

export {listContains, ListResult};
