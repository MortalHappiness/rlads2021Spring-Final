import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import {
  CssBaseline, makeStyles, Drawer, Box, AppBar, Toolbar, List, Typography, 
  Divider, IconButton, Badge, Container, Grid, Paper, Button
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import { mainListItems, secondaryListItems } from './listItems';
import Chart from './components/Chart';
import Deposits from './components/Deposits';
import Orders from './components/Orders';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: '#34656d',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    backgroundColor: '#e1e5ea',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    backgroundColor: '#e1e5ea',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: '#e1e5ea',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 600,
  },
}));

const initial_data = [
  {"word":"好吃","tf_idf":3.682,"y":"好吃"},
  {"word":"麵","tf_idf":2.8361,"y":"麵"},
  {"word":"翻譯","tf_idf":2.5333,"y":"翻譯"},
  {"word":"原始","tf_idf":2.5095,"y":"原始"},
  {"word":"親切","tf_idf":2.3921,"y":"親切"},
  {"word":"由","tf_idf":2.3504,"y":"由"},
  {"word":"google","tf_idf":2.3466,"y":"google"},
  {"word":"專業","tf_idf":2.3128,"y":"專業"},
  {"word":"評論","tf_idf":1.9746,"y":"評論"},
  {"word":"提供","tf_idf":1.7826,"y":"提供"},
  {"word":"細心","tf_idf":1.7011,"y":"細心"},
  {"word":"服務","tf_idf":1.6654,"y":"服務"},
  {"word":"醫生","tf_idf":1.6076,"y":"醫生"},
  {"word":"技師","tf_idf":1.6051,"y":"技師"},
  {"word":"不錯","tf_idf":1.6026,"y":"不錯"}
]


function App() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [chartData, setChartData] = useState(initial_data);
  const [input, setInput] = useState("某地");

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const fetchTidy = async () => {
    let data = await fetch(`http://localhost:4000/ex-tidy`, { credentials: 'include' })
      .then((res) => {return res.json()})
      .then((data) => {
        // console.log(data);
        return data;
      })
    console.log("Received: ", data)
    setChartData(data)
  }

  // fetchTidy();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, openDrawer && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>

          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>

        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
        }}
        open={openDrawer}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />
        {/* <List>{mainListItems}</List> */}
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>

          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart 
                  input={input}
                  chartData={chartData} 
                />
              </Paper>
            </Grid>

            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                {/* <Deposits /> */}
              </Paper>
            </Grid>

            {/* Recent Orders */}
            {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid> */}

          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default App;