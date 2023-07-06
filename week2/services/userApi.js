import api from "./index";

const checkDuplicateEmail = async (email) => {
    return await api.post("/user/checkDuplicateEmail", {});
}

//email ps