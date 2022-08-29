export type Event = {
    title: string;
    author: User;
    date: string;
    desc: string;
    duration: string;
    hook: string;
    id: string;
    location: string;
    num_seats: number;
    participants: User[];
    seat_price: number;
};
export type User = {
    displayName: string;
    photoURL: string;
    walletAddr: string;
    uid: string;
};

export type Guide = {
    title: string;
    cover_url: string;
    author: User;
    date: string;
    md_text: string;
};

export type Course = {
    title: string;
    author: User;
    photoURL: string;
    hook: string;
    id: string;
    location: string;
    date: string;
    duration: string;
    desc: string;
    seat_price: number;
    num_seats: number;
};
