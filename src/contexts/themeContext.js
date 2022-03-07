import React, {useContext, useState,useEffect} from "react";


const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
}

export function ThemeProvider({children}) {



    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        (async() => {
            const f = await localStorage.getItem("darkTheme")


            if (f === "false")
            setDarkTheme(true)
        })();
    })
        




    function toggleTheme() {
        setDarkTheme(prevTheme => !prevTheme);
        (async()=>{
            localStorage.setItem("darkTheme", `${darkTheme ? "true" : "false"}`)
            const a = await localStorage.getItem("darkTheme");
            console.log("theme changed in local storage", a)

        })()


       
    }

    return(
        <ThemeContext.Provider value = {darkTheme}>
            <ThemeUpdateContext.Provider value = {toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>

        </ThemeContext.Provider>
    )
}