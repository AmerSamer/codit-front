import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "semantic-ui-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const NavNotAdmin = () => {
    const [activeItem, setActiveItem] = React.useState('')

    const navigate = useNavigate()
    const Active = (e, { name }) => {
        setActiveItem(name)
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
            <Menu style={{ height: '8%' }} icon fluid fixed={'top'} size={'large'} inverted widths={1}>
                
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
export default NavNotAdmin