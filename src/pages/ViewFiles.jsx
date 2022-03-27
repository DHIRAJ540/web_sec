
import React, {useState} from "react";
import "./MiddlePane.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Card from "./Card/Card";
import { Route } from 'react-router-dom'; 
import Navigation from '../components/Navigation'
import SearchBar from '../components/SearchBar';
import {useTheme, useThemeUpdate, useMenuToggle} from "../contexts/themeContext"

// New
import moonIcon from '../assets/img/moon.svg'
import sunIcon from "../assets/img/sun.svg"
import gridIcon from "../assets/img/grid.svg"
import gridDarkIcon from "../assets/img/griddark.svg"
import CustomizedMenus from "../components/Sidebar/AddBtn/CustomizedMenus";
import { addEntry, deleteEntry, setEntry } from "../actions/fileSystem";
import { connect } from "react-redux";
import { generateTreeFromList } from "../utils/fileSystem";


const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
})); 
const ViewFiles = (props) => {

  
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();
  const toggleMenu = useMenuToggle()
  const classes = useStyles();
  const [sideDrawerToggle, setSideDrawerToggle] = useState(true);

  console.log("viewfiles props...", props)



  

  


  return (
    <div className={`middlePane ${toggleMenu ? "" : "opened"} ${darkTheme ? "dark-theme" : ""}` }  >
      <div className="middlePane_upper">
        <SearchBar />
        <div className={`theme-toggle ${darkTheme ? "dark" : ""}`} onClick={() => toggleTheme()} >
          <div className="theme-btn">
            <img src={moonIcon} alt="dark" />
            <img src={sunIcon} alt="light" />
          </div>
        </div>
      </div>
      <div className="min_upload_section">
            <CustomizedMenus
              btnSize="long"
              addEntry={(value) => {
                console.log(value);
                props.addEntry({
                  ...value,
                });
              }}
              setEntry={(val) => props.setEntry(val)}
              currentpath={props.match.url}
              onEnterProgress={() => setSideDrawerToggle(false)}
              
            />
      </div>
      <div className="middlePane_cards" style = {{background: `${darkTheme ? "#121212" : "#fff"}` }} >
        <div className="midPane-header">
          <div className="navigation-container" >
            <h2>Your Files - Secure <span role="img" aria-label="sheep">🔑</span></h2>
            <Navigation />
          </div>
          <div className="layout-toggle">
            {darkTheme ? <img src={gridDarkIcon} alt="grid" /> : <img src={gridIcon} alt="grid" />}
          </div>
        </div>
        <div className="table-header">
              <p>Name</p>
              <p>Size</p>
              <p>Type</p>
            </div>
        <Route path="*" 
        component={Card} 
        />
      </div>
    </div>
  );
};


const mapStateToProps = (state, ownProps) => {
  const fileStructure = generateTreeFromList(state.fileSystem);

  // const path = ownProps.match.url;
  return {
    fileStructure,
  };
};


export default connect(mapStateToProps, { addEntry, deleteEntry, setEntry })(
  ViewFiles
);