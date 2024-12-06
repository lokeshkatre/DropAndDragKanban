import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.css';
import { DataContext } from '../../DataContext/DataContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const {setOrdering, setGrouping } = useContext(DataContext);
    const dropdownRef = useRef(null);
    const [Dropdown, setDropdown] = useState(false);
    const navigate = useNavigate();

    const redirect = (e)=>{
        const value = e.target.value;
        setGrouping(value);
        navigate(`/${value}`)
    }
    const changeOrder = (e)=>{
        const value = e.target.value;
        setOrdering(value);
    }

    const toggleChange = () => {
        setDropdown(prev => !prev);
    }

    useEffect(() => {
        const changeDropdown = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdown(false);  // Close the dropdown when clicking outside
            }
        };

        document.addEventListener('mousedown', changeDropdown);
        return () => {
            document.removeEventListener('mousedown', changeDropdown);
        };
    }, []);

    return (
        <div className='navigation'>
            <div className='display'>
                <div>
                    <button onClick={() => toggleChange()}>Display</button>
                    {
                        Dropdown && (
                            <div className='links' ref={dropdownRef}>

                                <div className='options'>
                                    <span>Group</span>
                                    <select
                                        onChange={redirect}
                                    >
                                        <option value="">Status</option>
                                        <option value="user">User</option>
                                        <option value="priority">Priority</option>
                                    </select>
                                </div>
                                <div className='options'>
                                    <span>Order</span>
                                    <select
                                        onChange={changeOrder}
                                    >
                                        <option value="title">Title</option>
                                        <option value="priority">Priority</option>
                                    </select>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar