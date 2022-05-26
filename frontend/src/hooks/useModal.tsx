import React, { useEffect } from "react";

export default () => {
    let [modal, setModal] = React.useState(false);
    let [is_login, set_is_login] = React.useState(false);

    let handleModal = (is_login: boolean) => {
        set_is_login(is_login);
        setModal(!modal);
    };


    return { modal, handleModal, is_login};
};
