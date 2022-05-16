import React from "react";

export default () => {
    let [modal, setModal] = React.useState(false);

    let handleModal = () => {
        setModal(!modal);
    };

    return { modal, handleModal };
};
