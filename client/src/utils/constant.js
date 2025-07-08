export const path={
    HOME:'/',
    LOGIN:'/login',
    PROFILE:'/user/profile',
    CHANGEPASSWORD:'/user/change-password',
    MOVIES_BY_STATUS: '/movies/:statusSlug',
    MOVIE_DETAIL: '/movies/detail/:id/:slug',
    SHOWTIME: '/showtime',
    BOOKING_TICKET:'/booking/:showtime_id/select-seat',
    MY_TICKET:'/user/orders',
    SEARCH: '/search?s=:keyword',

    //system paths:
    ADMIN: '/admin',
    DASHBOARD: 'dashboard',
    USER_MANAGER: 'user-manager',
    CINEMA_CHAIN_MANAGER: 'cinema-chain-manager',
    CINEMA_CLUSTER_MANAGER: 'cinema-cluster-manager',
    CINEMA_MANAGER: 'cinema-manager',
    MOVIE_MANAGER: 'movie-manager',
    ADD: 'add',
    UPDATE: 'update/:id'
}