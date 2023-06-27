import { AddAlert, Create, Description, Home, Logout, Menu, NotificationsActive } from "@mui/icons-material";
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
import React, { useState } from "react";

const drawerWidth = 240;

interface Props {
    window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const router = useRouter();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const onLogout = () => {
        localStorage.removeItem("Logged");
        router.push("/");
    };

    const drawer = (
        <div>
            <Toolbar sx={{ color: '#000000' }}>Students report problems</Toolbar>
            <Divider />
            <div>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/lect_home">
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#FFFFFF' }} primary="หน้าหลัก" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component="a" href="/lect_read">
                        <ListItemIcon>
                            <AddAlert />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#FFFFFF' }} primary="ดูรายงานนักศึกษา" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton component="a" href="/lect_graph">
                        <ListItemIcon>
                            <Description />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#FFFFFF' }} primary="สรุปรายงานทั้งหมดของนักศึกษา" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" href="/lect_edit">
                        <ListItemIcon>
                            <Create />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#FFFFFF' }} primary="แก้ไขข้อมูลส่วนตัว" />
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
                    marginBottom: 35,
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
                    <Box sx={{ flexGrow: 1 }} />
                    <ListItemIcon sx={{ color: '#000000' }}>
                        <NotificationsActive />
                    </ListItemIcon>
                    <Typography variant="body1" noWrap component="div" sx={{ color: '#000000' }}>
                        ระบบผู้ใช้: อาจารย์
                    </Typography>
                    <ListItemIcon sx={{ color: '#000000' }}>
                        <Logout onClick={onLogout} />
                    </ListItemIcon>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
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
                            color: '#FFFFFF',
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
                            color: '#FFFFFF',
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
                    marginLeft: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar />
                {/* Your content goes here */}
            </Box>
        </Box>
    );
}
