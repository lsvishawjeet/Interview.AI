import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
export {default} from "next-auth/middleware"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const url = request.nextUrl

    if (!token) {
        if (url.pathname !== '/sign-in' && url.pathname !== '/sign-up' && url.pathname !== '/verify') {
            return NextResponse.redirect(new URL('/sign-in', request.url))
        }
    } else {
        if (url.pathname === '/sign-in' || url.pathname === '/sign-up' || url.pathname === '/' || url.pathname.startsWith('/verify')) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/sign-up',
        '/sign-in',
        '/',
        '/verify/:path*',
        '/dashboard'
    ]
}
