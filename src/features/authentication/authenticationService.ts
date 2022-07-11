const login = async (username: string, password: string) => {
    const promise = new Promise<string>((resolve, reject) => {
        if (username == "upworkTest" && password == "2022") {
            resolve(username);
        } else {
            reject();
        }
    });

    return promise;
}

const authenticationService = {
    login
};
export default authenticationService;