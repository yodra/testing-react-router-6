import React, { FC } from "react";
import { Link } from "react-router-dom";

const Profile: FC<any> = ({ profile, doLogout }) => {
    return <div>Hi {profile}!!
        <Link to="/">go to home</Link>
        <Link to="/about">go to about</Link>
        <button onClick={doLogout}>Logout</button>
    </div>
};

export default Profile;
