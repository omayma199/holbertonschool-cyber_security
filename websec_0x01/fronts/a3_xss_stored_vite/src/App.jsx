import Profile from './Profile';
import EditProfile from './EditProfile';
import Login from './Login';


const pathname = window.location.pathname.split('/');
const current_path = pathname[pathname.length - 1]


export default function App() {
    switch (current_path) {
        case 'edit':
            return <EditProfile />;
        case 'login':
            return <Login />;
        default:
            return <Profile />;
    }
}
    