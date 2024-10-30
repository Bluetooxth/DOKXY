import { NextResponse } from 'next/server';
import {jwtDecode} from 'jwt-decode';

export function middleware(req) {
    const path = req.nextUrl.pathname;
    const token = req.cookies.get('token')?.value;

    const protectedPaths = ['/user-dashboard', '/doctor-dashboard'];
    const authPaths = ['/login', '/signup', '/doctor-login', '/doctor-signup'];

    if (!token) {
        if (protectedPaths.some(protectedPath => path.startsWith(protectedPath))) {
            return NextResponse.redirect(`${req.nextUrl.origin}/login`);
        }

        const doctorProfilePattern = /^\/doctors\/\w+$/;
        if (doctorProfilePattern.test(path)) {
            return NextResponse.redirect(`${req.nextUrl.origin}/login`);
        }
    } else {
        try {
            const decodedToken = jwtDecode(token);
            const role = decodedToken.role;

            if (authPaths.includes(path) || path === '/dashboard') {
                if (role === 'patient') {
                    return NextResponse.redirect(`${req.nextUrl.origin}/user-dashboard`);
                } else if (role === 'doctor') {
                    return NextResponse.redirect(`${req.nextUrl.origin}/doctor-dashboard`);
                }
            }

            if (role === 'patient' && ['/doctor-login', '/doctor-signup', '/doctor-dashboard'].includes(path)) {
                return NextResponse.redirect(`${req.nextUrl.origin}/user-dashboard`);
            } else if (role === 'doctor' && ['/login', '/signup', '/user-dashboard'].includes(path)) {
                return NextResponse.redirect(`${req.nextUrl.origin}/doctor-dashboard`);
            }
        } catch (error) {
            return NextResponse.redirect(`${req.nextUrl.origin}/login`);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/services',
        '/doctors',
        '/doctors/:username*',
        '/login',
        '/signup',
        '/doctor-login',
        '/doctor-signup',
        '/user-dashboard',
        '/doctor-dashboard',
    ],
};