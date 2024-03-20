import { Link } from 'react-router-dom';
import { getUserProfile } from '../../Funtions/userfuntions';
import { useState, useEffect } from 'react';
export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserProfile(); // Call the getUserProfile function
                setUser(userData);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                // Handle error as needed, e.g., display error message to the user
            }
        };
        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Error: Failed to fetch user data</div>; // Display error message if user data is not available
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3">
                    <div className="text-center mb-3">
                        <img
                            src={`${user.avatar}`} // Replace 'user.avatar' with the actual URL of the avatar
                            alt="Avatar"
                            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
                        />
                    </div>
                    <Link to="/myprofile/edit" className="btn btn-primary btn-block">
                        Edit Profile
                    </Link>
                    <Link to="/myprofile/changepassword" className="btn btn-primary btn-block mt-3">
                        Change Password
                    </Link>
                </div>
                <div className="col-md-9">
                    <h2>User Details</h2>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>

                    <h4>Email Address</h4>
                    <p>{user.email}</p>

                    <h4>Joined</h4>
                    <p>{String(user.createdAt).substring(0, 10)}</p>
                </div>
            </div>
        </div>
    );
}
