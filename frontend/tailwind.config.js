module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                morange: "#ff9800",
                mblue: "#00acc1",
            },
            transitionProperty: {
                width: "width",
            },
            backgroundImage: {
                redwood: "url('../src/img/redwood-up.jpg')",
            },
        },
    },
    plugins: [],
};
