import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Nav = () => {
    const [activeItem, setActiveItem] = React.useState('')

    const navigate = useNavigate()
    const Active = (e, { name }) => {
        setActiveItem(name)
        if (name === 'Home') {
            navigate('/dashboard')
        }
        if (name === 'Employees') {
            navigate('/employees')
        }
        if (name === 'Tasks') {
            navigate('/tasks')
        }
        if (localStorage.getItem('authTokenCodit') !== null) {
            if (name === 'LogOut') {
                localStorage.removeItem('authTokenCodit')
                toast.error("You Have Logged Out");
                setTimeout(() => {
                    navigate('/')
                }, 2000)
            }
        } else {
            toast('Please Authenticate', { theme: 'dark' })
        }
    }


    return (
        <>
            <Menu style={{ height: '8%', backgroundColor:"rgba(0,0,0,0.6)" }} icon fluid fixed={'top'} size={'large'} inverted widths={4}>
                <MenuItem
                    name='Home'
                    active={activeItem === 'Home'}
                    onClick={Active}
                >
                    <i style={{color: '#1E90FF'}} className="fas fa-home"></i>
                    &nbsp; &nbsp;     Home
                </MenuItem>
                <MenuItem
                    name='Employees'
                    active={activeItem === 'Employees'}
                    onClick={Active}
                >
                    <i style={{color: '#1E90FF'}} className="fas fa-users"></i>
                    &nbsp; &nbsp;       Employees
                </MenuItem>
                <MenuItem
                    name='Tasks'
                    active={activeItem === 'Tasks'}
                    onClick={Active}
                >
                    <i style={{color: '#1E90FF'}} className="fas fa-tasks"></i>
                    &nbsp; &nbsp;   Tasks
                </MenuItem>
               
                <MenuItem
                    name='LogOut'
                    active={activeItem === 'LogOut'}
                    onClick={Active}
                ><i style={{ color: 'rgba(255, 255, 255, 0.3)' }} className="share square outline icon"></i>
                    &nbsp; &nbsp;     LogOut
                </MenuItem>
            </Menu>
            <ToastContainer />
        </>

    )
}
export default Nav