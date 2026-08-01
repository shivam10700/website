import { withAuth } from "next-auth/middleware"  
import { NextResponse } from "next/server"  
  
export default withAuth(  
  function middleware(req) {  
    // Protect dashboard routes  
    if (req.nextUrl.pathname.startsWith("/dashboard") && !req.nextauth.token) {  
      return NextResponse.redirect(new URL("/login", req.url))  
    }  
      
    // Protect API routes  
    if (req.nextUrl.pathname.startsWith("/api/user") && !req.nextauth.token) {  
      return NextResponse.redirect(new URL("/login", req.url))  
    }  
  },  
  {  
    callbacks: {  
      authorized({ req, token }) {  
        if (req.nextUrl.pathname.startsWith("/dashboard")) {  
          return token !== null  
        }  
        return true  
      }  
    }  
  }  
)  
  
export const config = {  
  matcher: ["/dashboard/:path*", "/api/user/:path*"]  
}  
