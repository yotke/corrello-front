import {HomePage} from './pages/home-page.jsx'
import {AboutUs} from './pages/about-us.jsx'
import {Workspace} from './pages/workspace.jsx'
import {ReviewApp} from './pages/review-app.jsx'
import { ChatApp } from './pages/chat-app.jsx'
import { AdminApp } from './pages/admin-app.jsx'
import { CardDetail } from './pages/card-detail.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path:'/',
        component: HomePage,
        label: 'Home 🏠',
    },
    {
        path:'/workspace',
        component: Workspace,
        label: 'Workspace'
    },
    {
        path:'/review',
        component: ReviewApp,
        label: 'Reviews'
    },
    {
        path:'/chat',
        component: ChatApp,
        label: 'Chat'
    },
    {
        path:'/about',
        component: AboutUs,
        label: 'About us'
    },
    {
        path:'/admin',
        component: AdminApp,
        label: 'Admin Only'
    },
    {
        path:'/card:id',
        component: CardDetail,
        label: 'CardDetail'
    }
]

export default routes;