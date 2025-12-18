// // Pseudo-code logika middleware
// export function middleware(request) {
//   const currentUser = request.cookies.get('session')
  
//   // Jika user mencoba akses /admin tapi tidak ada session (belum login)
//   if (request.nextUrl.pathname.startsWith('/admin') && !currentUser) {
//     return Response.redirect(new URL('/login', request.url))
//   }
// }