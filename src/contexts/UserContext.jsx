import { createContext, useState } from "react";
const UserContext = createContext();

// Add the new getUserFromToken function
const getUserFromToken = () => {
    const token = localStorage.getItem('token');

    if (!token) return null;

    return JSON.parse(atob(token.split('.')[1])).payload;
};

function UserProvider({ children }) {
    // call getUserFromToken() to get our initial user state
    const [user, setUser] = useState(getUserFromToken());

    // This is the user state and the setUser function that will update it!
    // This variable name isn't special; it's just convention to use `value`.
    const value = { user, setUser };
    return (
        <UserContext.Provider value={value}>
            {/* The data we pass to the value prop above is now available to */}
            {/* all the children of the UserProvider component. */}
            {children}
        </UserContext.Provider>
    );
};

// When components need to use the value of the user context, they will need
// access to the UserContext object to know which context to access.
// Therefore, we export it here.
export { UserProvider, UserContext }