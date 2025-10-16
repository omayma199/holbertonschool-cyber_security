import { useState } from 'react';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import IconButton from '@mui/joy/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

import logo from '../assets/logo1.png';


export default function SideBar({titles,  xsp}) {
    const [ pathname, setPathname ] = useState(window.location.pathname);
    const [ color, setColor ] = useState('primary');
    return (
        <Sheet
            variant="solid"
            color="primary"
            invertedColors
            sx={{
                minWidth: 220,
                maxWidth: 280,
                bgcolor: `${color}.500`,
                display: { xs: xsp, sm: 'flex'},
                position: { xs: 'absolute', sm: 'relative' },
                flexDirection: 'column',
                flexWrap: 'nowrap',
                overflow: 'hidden',
                height: '100vh',
                zIndex: 99
            }}
        >
            <Card
                variant='plein'
                sx={{
                    backgroundImage: `url('${logo}')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundColor: 'unset',
                    width: '100%',
                    height: 130,
                    flexShrink: 0,
                    my: 1,
                    mx: 'auto',
                }}
            ></Card>

            <List
                size="sm"
                sx={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    width: 320,
                    pl: '24px',
                    '--List-insetStart': '32px',
                    '--ListItem-paddingY': '0px',
                    '--ListItem-paddingRight': '16px',
                    '--ListItem-paddingLeft': '21px',
                    '--ListItem-startActionWidth': '0px',
                    '--ListItem-startActionTranslateX': '-50%',
                    [`& .${listItemButtonClasses.root}`]: {
                      borderLeftColor: 'divider',
                    },
                    [`& .${listItemButtonClasses.root}.${listItemButtonClasses.selected}`]: {
                      borderLeftColor: 'currentColor',
                    },
                    '& [class*="startAction"]': {
                      color: 'var(--joy-palette-text-tertiary)',
                    },
                  }}
            >
                <ListItem nested>
                    <ListItem component="div" startAction={<DashboardIcon />}>
                        <Typography
                            level="body-xs"
                            sx={{ textTransform: 'uppercase' }}
                        >Dashboard</Typography>
                    </ListItem>
                    <ListItem sx={{ '--List-gap': '0px' }}>
                        <ListItemButton href="/" component="a" sx={{ fontWeight: pathname == '/' ? 'bold': 'normal' }}>Profile</ListItemButton>
                    </ListItem>
                </ListItem>
                { titles.map((title, titleKey) => {
                    const [ open, setOpen ] = useState(pathname.includes(title.id));
                    return (<ListItem
                        key={titleKey}
                        nested
                        sx={{ my: 1 }}
                        
                        startAction={
                            <IconButton
                                component="button"
                                variant="plain"
                                size="sm"
                                color="neutral"
                                onClick={() => setOpen(!open)}
                                disabled={title.subs.length == 0}
                            >
                                <KeyboardArrowDown
                                    sx={{ transform: open && title.subs.length > 0 ? 'initial' : 'rotate(-90deg)' }}
                                />
                            </IconButton>
                        }
                    >
                        <ListItem onClick={() => setOpen(!open)} >
                            <Typography
                                level="body-xs"
                                sx={{
                                    cursor: 'pointer',
                                    fontWeight: open && title.subs.length > 0 ? 'bold' : undefined,
                                    color: title.subs.length > 0 ? (open ? 'text.primary' : 'inherit') : 'text.disabled',
                                }}
                            >{ title.name }</Typography>
                            <Typography component="span" level="body-xs">{ title.subs.length }</Typography>
                        </ListItem>
                        { ((open) && (title.subs.length > 0)) ?
                            title.subs.map((sub, subKey) => (<ListItem sx={{ '--List-gap': '0px' }} key={ subKey }>
                                    <ListItemButton
                                        sx={{ fontWeight: pathname.includes(sub.url) ? 'bold': 'normal' }}
                                        href={sub.url}
                                        component="a"
                                    >{ sub.name }</ListItemButton>
                                </ListItem>)
                            ) : null
                        }
                    </ListItem>)
                })}
                
            </List>

            <Card
                size="sm"
                variant="plein"
                sx={{
                    textAlign: 'center',
                    mt: 2,
                    bgcolor: `background.level2`,
                    borderRadius: 0
                }}
            >
                <Typography
                    endDecorator={<Link href="https://dextershield.com" target="_blank">Yosri.me</Link>}
                    fontSize="sm"
                    sx={{ alignSelf: 'center' }}
                >Made With ❤️ by</Typography>
            </Card>
        </Sheet>
    );
}