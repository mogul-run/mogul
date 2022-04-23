function Home(props: any) {
    return <div>{props.userAllowed ? <HomeContent /> : <PayWall />}</div>;
}

function HomeContent() {
    return <div>You got in!</div>;
}

function PayWall() {
    return <div>token requirement not met</div>;
}

export default Home;
