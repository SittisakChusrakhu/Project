import { AddCircleOutline, BarChart, Description, Home,  Logout, Menu, NotificationsActive } from "@mui/icons-material";
import {
    Toolbar,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Drawer,
    AppBar,
    IconButton,
    Typography,
    CssBaseline,
    Divider,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";


const drawerWidth = 240;

interface Props {
    window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const router = useRouter();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const onlogout = () => {
        localStorage.removeItem("Logged");
        router.push("/");
    }
        
    const drawer = (
        <div>
            <Toolbar sx={{ color: '#FFFFFF', backgroundColor: '#368980' }}>Students report problems</Toolbar>
            <Divider />
            <div>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/admin">
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#FFFFFF' }} primary="หน้าหลัก" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component="a" href="/add-uesr">
                        <ListItemIcon>
                            <AddCircleOutline />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#FFFFFF' }} primary="จัดการผู้ใช้งาน" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component="a" href="/add-report">
                        <ListItemIcon>
                            <Description />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#FFFFFF' }} primary="เพิ่มTopicเรื่องปัญหาการเรียน" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/menu_add">
                        <ListItemIcon>
                            <BarChart />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#FFFFFF' }} primary="รายงานภาพรวม" />
                    </ListItemButton>
                </ListItem>
            </div>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    marginBottom: 50,
                    backgroundColor: '#368980',
                }}
            >
                <Toolbar style={{ backgroundColor: '#FFFFFF' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ color: '#000000' }}>
                        หน้าหลัก
                    </Typography>
                    <ListItemIcon sx={{ ml: 110 ,color: '#000000' }}>
                        <NotificationsActive />
                    </ListItemIcon>
                    <Typography variant="body1" noWrap component="div" sx={{ color: '#000000' }}>
                        ระบบผู้ใช้: แอดมิน
                    </Typography>
                    <ListItemIcon sx={{ ml: 0.5 ,color: '#000000' }}>
                        <Logout onClickCapture={onlogout} /> 
                    </ListItemIcon>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{
                    width: { sm: drawerWidth },
                    flexShrink: { sm: 0 },
                }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: '#368980',
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            backgroundColor: '#368980',
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                {/* Your content goes here */}
            </Box>
        </Box>
    );
}
