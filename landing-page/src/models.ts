import {v4 as uuidv4} from 'uuid';

type IDocument = {
    id: string
}

type IUser = IDocument & {
    firstName: string;
    lastName: string;
}

class User implements IUser {
    id: string;
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.id = uuidv4();
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

export default User;