import { HomePage } from './pages/home-page.jsx'
import { Workspace } from './pages/workspace.jsx'
import { ChatApp } from './pages/chat-app.jsx'
import { BoardApp } from './pages/board-app.jsx'

import { LoginSignup } from './pages/login-page.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: HomePage,
        label: 'Home 🏠',
    },
    {
        path: '/workspace',
        component: Workspace,
        label: 'Workspace'
    },
    {
        path: '/board/:boardId/:listId?/:cardId?',
        component: BoardApp,
        label: 'board'
    },
    {
        path: '/login',
        component: LoginSignup,
    },
    {
        path: '/signup',
        component: LoginSignup,
    },
    {
        path: '/chat',
        component: ChatApp,
        label: 'Chat'
    },


]

export default routes;