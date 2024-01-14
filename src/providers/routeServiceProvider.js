import authenticate from '@/middlewares/authenticate';

// Sets all global middlewares
export const middlewares = [
    authenticate
];