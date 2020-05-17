import React, { FC, Suspense, useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import './App.css';

const Profile = React.lazy(() => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            const page: any = await import("./pages/Profile")
            resolve(page);
            // reject('error');
        }, 2000)
    })
});

export const Home: FC<any> = ({ doLogin }) => {
    return <div>Home
        <Link to="/about">go to about</Link>
        <Link to="/me">go to profile</Link>
        <button onClick={doLogin}>Login</button>
    </div>
};

export const About: FC = () => {
    return <div>About
        <Link to="/">go to home</Link>
        <Link to="/me">go to profile</Link>
    </div>
};

export const NotFound: FC = () => {
    return <div>NotFound</div>
};

export const PrivateRoute: FC<any> = ({ path, element, profile }) => {
    return profile ? <Route path={path} element={element}/> : <Navigate to="/" replace={true}/>;
};

const App = () => {
    const [profile, setProfile] = useState();
    const doLogin = () => setProfile('pepe');
    const doLogout = () => setProfile(undefined);

    return <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home doLogin={doLogin}/>}/>
                <Route path="about" element={<About/>}/>
                <PrivateRoute path="me" element={<Profile profile={profile} doLogout={doLogout}/>} profile={profile}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    </Suspense>
};

export default App;
