import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'


const UsersContext = createContext()
export default function UsersContextProvider(props) {
    const [fetchedUsers, setFetchedUsers] = useState([])


    const URL = 'http://localhost:8005';
   
    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${URL}/admin/user`);

            console.log(res);

            const { data } = res;

            setFetchedUsers(data);

        } catch (err) {

            console.error('Something went wrong while fetching Tasks', err);
        }
    };


    useEffect(() => {

        fetchUsers()

    }, [])
    return (
        <>
            <UsersContext.Provider value={{ fetchUsers, fetchedUsers, setFetchedUsers }}>
                {props.children}
            </UsersContext.Provider>
        </>
    )
}


export const useUsersContext = () => useContext(UsersContext)