import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import styles from '../Css/NavBar.module.css';

import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';
import LeftTpSchedulerDropMenuComponent from './TopTabComponent/LeftTpSchedulerDropMenuComponent';
import TopRightPersonIconDropMenuComponent from './TopTabComponent/TopRightPersonIconDropMenuComponent';
import TopTpSchedulerDropMenuComponent from './TopTabComponent/TopTpSchedulerDropMenuComponent';
import TopRightSignButtonComponent from './TopTabComponent/TopRightSignButtonComponent';
import HomeIcon from '../image/HomeIcon.svg'




const useStyles = makeStyles(theme => ({
    Appbar: {
        // flexGrow: 1,
        // width: '80%',
        backgroundColor: '#1e1eff',//'linear-gradient(45deg, #1ff1a9 30%, #1fc5a9 90%)',
        // border: 0,
        // borderRadius: 3,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        //height: 85,
        position: 'fixed',
        top: 0
        // padding: '0 px',
    },
    Tab: {
      textTransform: 'none', // 대문자로 자동변환 방지
      fontSize: '14px',
      fontWeight: theme.typography.fontWeightBold,
      marginTop: theme.spacing(3)
    },
    HomeIcon: {
      fontSize: '60px',
      color: '#c8c8c8',
    },
}));



const TopTabComponent = (props) => {
    const classes = useStyles();
    const LeftTpSchedulerDropMenuRef = React.useRef();    // 왼쪽 TP스케쥴러 버튼 클릭시 나오는 drop menu component를 참조하는 변수
    const TopTpSchulerDropMenuRef = React.useRef();       // 상단 TP스케쥴러 버튼 클릭시 나오는 drop menu component를 참조하는 변수
    const TopRightPersonIconDropMenuRef = React.useRef(); // 상단 오른쪽 로그인한 사용자 아이콘 클릭시 나오는 drop menu component를 참조하는 변수
    

    const [value, setValue] = React.useState(0);
    const [openTabMenu, setOpenTebMenu] = React.useState(false);  // 상단 TP스케쥴러 버튼 클릭 여부(tp스케쥴러 옆 화살표 모양 변경을 위함) 

    function handleOpenTabMenu() {  // 상단 TP스케쥴러 버튼 클릭 시 호출. child component에서 호출됨
      setOpenTebMenu(!openTabMenu);
    } 
    
    function handleTopRightPersonIcon(event) {  // 로그인 시 상단 오른쪽에 나타나는 사람 아이콘 클릭 시 호출됨. child component의 함수를 호출함
      TopRightPersonIconDropMenuRef.current.handleIconClick(event);
    }
    
    function handleChange(event, newValue) {
      console.log('newValue : ' + newValue);
      setValue(newValue);
    }

    return (
      <span>
        <div>
            <AppBar position="static" className={classes.Appbar}>
              <Grid container>
                <Grid item sm={10} xs={9}>
                  <Hidden only={['md', 'lg', 'xl']}>
                    <IconButton color="inherit" aria-label="menu" onClick={() => LeftTpSchedulerDropMenuRef.current.toggleDrawer('left', true)}>
                      <MenuIcon />
                    </IconButton>
                  </Hidden>
                  <Hidden only={['xs', 'sm']}>
                    <Grid container>
                    <Grid item md={1}>
                      <IconButton component={Link} to="/">
                        <img src={HomeIcon} width="50" height="50" />
                      </IconButton>
                    </Grid>
                    <Grid item md={11}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        // indicatorColor="secondary"
                        // textColor="secondary"
                        variant="standard"
                        scrollButtons="auto"
                        >
                            <Tab className={classes.Tab} label={<><div>TP배치스케쥴러{openTabMenu?<ExpandLess/>:<ExpandMore/>}</div></>} 
                            onClick={(event) => TopTpSchulerDropMenuRef.current.handleTabClick(event)}/> 
                            <Tab className={classes.Tab} label="정산배치스케쥴러" component={Link} to="/about" />
                            <Tab className={classes.Tab} label="About Visualizer" component={Link} to="/about" />
                    </Tabs>
                    </Grid>
                    </Grid>
                  </Hidden>
                </Grid>
                <Grid item sm={2} xs={3}>
                  <div>
                    <TopRightSignButtonComponent isLogin={props.isLogin} handleTopRightPersonIcon={handleTopRightPersonIcon}/>
                  </div>
                </Grid>
              </Grid>
          </AppBar>
        </div>
          <TopTpSchedulerDropMenuComponent handleOpenTabMenu={handleOpenTabMenu} ref={TopTpSchulerDropMenuRef} />
          <TopRightPersonIconDropMenuComponent handleSignOut={props.handleSignOut} ref={TopRightPersonIconDropMenuRef} />
          <LeftTpSchedulerDropMenuComponent side="left" isLogin={props.isLogin} ref={LeftTpSchedulerDropMenuRef} />
      </span>
    )
}

export default withRouter(TopTabComponent);
