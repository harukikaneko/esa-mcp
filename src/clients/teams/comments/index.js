// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetV1TeamsTeamNameCommentsCommentIdInclude = {
    stargazers: "stargazers",
};
export const getGetV1TeamsTeamNameCommentsCommentIdUrl = (teamName, commentId, params) => {
    const normalizedParams = new URLSearchParams();
    Object.entries(params || {}).forEach(([key, value]) => {
        if (value !== undefined) {
            normalizedParams.append(key, value === null ? "null" : value.toString());
        }
    });
    const stringifiedParams = normalizedParams.toString();
    return stringifiedParams.length > 0
        ? `https://api.esa.io/v1/teams/${teamName}/comments/${commentId}?${stringifiedParams}`
        : `https://api.esa.io/v1/teams/${teamName}/comments/${commentId}`;
};
export const getV1TeamsTeamNameCommentsCommentId = async (teamName, commentId, params, options) => {
    const res = await fetch(getGetV1TeamsTeamNameCommentsCommentIdUrl(teamName, commentId, params), {
        ...options,
        method: "GET",
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body
        ? JSON.parse(body)
        : {};
    return {
        data,
        status: res.status,
        headers: res.headers,
    };
};
export const getPatchV1TeamsTeamNameCommentsCommentIdUrl = (teamName, commentId) => {
    return `https://api.esa.io/v1/teams/${teamName}/comments/${commentId}`;
};
export const patchV1TeamsTeamNameCommentsCommentId = async (teamName, commentId, patchV1TeamsTeamNameCommentsCommentIdBody, options) => {
    const res = await fetch(getPatchV1TeamsTeamNameCommentsCommentIdUrl(teamName, commentId), {
        ...options,
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...options?.headers },
        body: JSON.stringify(patchV1TeamsTeamNameCommentsCommentIdBody),
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body
        ? JSON.parse(body)
        : {};
    return {
        data,
        status: res.status,
        headers: res.headers,
    };
};
export const getDeleteV1TeamsTeamNameCommentsCommentIdUrl = (teamName, commentId) => {
    return `https://api.esa.io/v1/teams/${teamName}/comments/${commentId}`;
};
export const deleteV1TeamsTeamNameCommentsCommentId = async (teamName, commentId, options) => {
    const res = await fetch(getDeleteV1TeamsTeamNameCommentsCommentIdUrl(teamName, commentId), {
        ...options,
        method: "DELETE",
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body
        ? JSON.parse(body)
        : {};
    return {
        data,
        status: res.status,
        headers: res.headers,
    };
};
export const getGetV1TeamsTeamNameCommentsUrl = (teamName) => {
    return `https://api.esa.io/v1/teams/${teamName}/comments`;
};
export const getV1TeamsTeamNameComments = async (teamName, options) => {
    const res = await fetch(getGetV1TeamsTeamNameCommentsUrl(teamName), {
        ...options,
        method: "GET",
    });
    const body = [204, 205, 304].includes(res.status) ? null : await res.text();
    const data = body
        ? JSON.parse(body)
        : {};
    return {
        data,
        status: res.status,
        headers: res.headers,
    };
};
