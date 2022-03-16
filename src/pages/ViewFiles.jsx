
import React, {useState} from "react";
import "./MiddlePane.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card/Card";
import { Route } from 'react-router-dom'; 
import Navigation from '../components/Navigation'
import SearchBar from '../components/SearchBar';
import {useTheme, useThemeUpdate, useMenuToggle} from "../contexts/themeContext"

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
})); 
const ViewFiles = () => {

  
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const toggleMenu = useMenuToggle()
  const classes = useStyles();



  

  


  return (
    <div className={`middlePane ${toggleMenu ? "" : "opened"}`} style = {{background: `${darkTheme ? "#121212" : "#fafafa"}` }} >
      <div className="middlePane_upper">
        <SearchBar />
        <div className="theme-toggle" onClick={() => toggleTheme()} >
        <div className={`theme-outer-container ${!darkTheme ? "light" : ""}`}>
            <div className="theme-container">
              <div className="theme-circle">
                <div className="theme-cloud"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="middlePane_cards" style = {{background: `${darkTheme ? "#121212" : "#fff"}` }} >
        <Navigation />
        <Route path="*" 
        component={Card} 
        />
      </div>
    </div>
  );
};

export default ViewFiles;
