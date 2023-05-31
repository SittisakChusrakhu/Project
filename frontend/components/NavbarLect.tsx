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
import React from "react";



const drawerWidth = 240;

interface Props {
    window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const onlogout = () => {
        localStorage.removeItem("Logged");
        router.push("/");
    }
    const router = useRouter();

    const drawer = (
        <div >
            <Toolbar sx={{ color: '#000000' }}>Students report problems</Toolbar>
            <Divider />
            <div>
                <ListItem disablePadding>
                    <ListItemButton href="/lect_home">
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#FFFFFF' }} primary="หน้าหลัก" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton href="/lect_read">
                        <ListItemIcon>
                            <AddAlert />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#FFFFFF' }} primary="ดูรายงานนักศึกษา" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton href="/lect_graph">
                        <ListItemIcon>
                            <Description />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#FFFFFF' }} primary="สรุปรายงานทั้งหมดของนังศึกษา" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/lect_edit">
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
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                marginLeft: { sm: `${drawerWidth}px` },
                height: 35,  // ปรับความยาวเป็น 35
            }}
        >
            <CssBaseline />
            <AppBar >
                <Toolbar style={{ backgroundColor: '#FFFFFF' }}>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ color: '#000000' }}>
                        หน้าหลัก
                    </Typography>
                    <ListItemIcon sx={{ ml: 110, color: '#000000' }}>
                        <NotificationsActive />
                    </ListItemIcon>
                    <Typography variant="body1" noWrap component="div" sx={{ color: '#000000' }}>
                        ระบบผู้ใช้: อาจารย์
                    </Typography>
                    <ListItemIcon sx={{ ml: 0.5, color: '#000000' }}>
                        <Logout onClickCapture={onlogout} />
                    </ListItemIcon>
                </Toolbar>
            </AppBar>
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
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
                    marginLeft: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar />
            </Box>
        </Box >

    );
}