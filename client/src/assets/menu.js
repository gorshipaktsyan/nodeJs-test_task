export function getMenu(type) {
    const menu = [
        {
            route: 'actions',
            name: 'Actions'
        },
        {
            route: 'message',
            name: 'Message'
        },
        {
            route: 'statistics',
            name: 'Statistics'
        }
    ];
    const adminMenu = [
        {
            route: 'admin/message',
            name: 'Messages'
        },
        {
            route: 'admin/commands',
            name: 'Commands'
        },
        {
            route: 'admin/users',
            name: 'Users'
        },
        {
            route: 'admin/actions',
            name: 'Actions'
        }
    ];
    
    return (type === 'menu') ? menu : adminMenu;
}


