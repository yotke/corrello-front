import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { Workspace } from './pages/workspace.jsx'
import { ReviewApp } from './pages/review-app.jsx'
import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'
import { CardDetails } from './pages/card-details.jsx'
import { BoardApp } from './pages/board-app.jsx'

import { LoginSignupPage } from './pages/login-page.jsx'

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
        path: '/log/:loginSignup?/:email?/',
        component: LoginSignupPage,
        label: 'login'
    },
    {
        path: '/chat',
        component: ChatApp,
        label: 'Chat'
    },
    {
        path: '/about',
        component: AboutUs,
        label: 'About us'
    },
    {
        path: '/admin',
        component: AdminApp,
        label: 'Admin Only'
    }
]

export default routes;