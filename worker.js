export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    if (pathname === '/' || pathname === '') {
      return Response.redirect(`${url.origin}/dan-pcn-o-to-tphcm/`, 302);
    }
    if (pathname === '/dan-pcn-o-to-tphcm') {
      return Response.redirect(`${url.origin}/dan-pcn-o-to-tphcm/`, 301);
    }
    if (pathname === '/cam-on' || pathname === '/cam-on/') {
      return Response.redirect(`${url.origin}/dan-pcn-o-to-tphcm/cam-on/`, 301);
    }
    if (pathname === '/dan-pcn-o-to-tphcm/cam-on') {
      return Response.redirect(`${url.origin}/dan-pcn-o-to-tphcm/cam-on/`, 301);
    }

    if (pathname.startsWith('/dan-pcn-o-to-tphcm/')) {
      const subPath = pathname.slice(19);
      if (subPath === '/' || subPath === '') {
        url.pathname = '/index.html';
      } else if (subPath === '/cam-on/' || subPath === '/cam-on') {
        url.pathname = '/cam-on/index.html';
      } else {
        url.pathname = subPath;
      }
      return env.ASSETS.fetch(new Request(url.toString(), request));
    }

    return env.ASSETS.fetch(request);
  },
};
