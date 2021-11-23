import { createRouter, createWebHistory } from 'vue-router'
import Cheap from '@/components/Cheap'
import Hot from '@/components/Hot'
import SearchCommodity from '@/components/SearchCommodity'
import SearchCommission from '@/components/SearchCommission'
import Help from '@/components/Help'
const routes = [{
        path: ('/'),
        name: 'cheap',
        component: Cheap
    },
    {
        path: '/hot',
        name: 'hot',
        component: Hot
    },
    {
        path: '/searchcommodity',
        name: 'searchcommodity',
        component: SearchCommodity
    }, {
        path: '/help',
        name: 'help',
        component: Help
    },
    {
        path: '/searchcommission',
        name: 'SearchCommission',
        component: SearchCommission
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router