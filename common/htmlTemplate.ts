type HTMLTemplateProps = {
    layout?: string,
    title: string,
    description: string,
    stylesVer?: number,
    path: string,
    cssString?: string,
    ver: number,
    mathJaxServiceOn?: boolean
}

const yandexMetrika = `
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(84140974, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
   });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/84140974" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
`

const mathJaxService = `
<script>
    MathJax = {
        loader: {load: ['input/asciimath', 'output/chtml']}
    }
</script>
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script type="text/javascript" id="MathJax-script" async
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js">
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
`

export default function htmlTemplate(props?: HTMLTemplateProps) {
    const {layout, title, description, stylesVer, path, cssString, ver, mathJaxServiceOn} = props || {
        title: "В разработке",
        description: "Страница находится в разработке",
        path: "/form/dev-page/",
        ver: 1,
        mathJaxServiceOn: false,
    }
    return `
<!doctype html>
<html lang="ru">
<head>
    <title>${title}</title>
    ${process.env.NODE_ENV === "production" ? yandexMetrika : ""}
    ${mathJaxServiceOn ? mathJaxService : ""}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="Description" content="${description}"/>
    <script type="text/javascript" async defer src="${path}bundle${ver}.js"></script>
    ${Boolean(stylesVer) ? `<link href="${path}styles${stylesVer}.css" rel="stylesheet"/>` : ""}
    ${Boolean(cssString) ? `<style id="jss-server-side">${cssString}</style>` : ""}
</head>
<body>
    <div id="root" class="root">${layout || ""}</div>
</body>
</html>
`
}