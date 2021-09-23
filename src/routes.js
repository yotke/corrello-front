import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { Workspace } from './pages/workspace.jsx'
import { ReviewApp } from './pages/review-app.jsx'
import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'
import { CardDetails } from './pages/card-details.jsx'
import { BoardApp } from './pages/board-app.jsx'

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
        path: '/board',
        component: BoardApp,
        label: 'board'
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
    },
    {
        path:'/card-details:id',
        component: CardDetails,
        label: 'Card Details'
    }
]

export default routes;