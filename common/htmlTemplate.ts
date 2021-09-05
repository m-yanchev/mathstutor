type HTMLTemplateProps = {
    layout?: string,
    title: string,
    description: string,
    isNotStyles?: boolean,
    path: string,
    cssString?: string
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

export default function htmlTemplate(props: HTMLTemplateProps) {
    const {layout, title, description, isNotStyles, path, cssString} = props
    return `
<!doctype html>
<html lang="ru">
<head>
    <title>${title}</title>
    ${process.env.NODE_ENV === "production" ? yandexMetrika : ""}
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="Description" content="${description}"/>
    <script type="text/javascript" async defer src="${path}bundle.js"></script>
    ${!Boolean(isNotStyles) ? `<link href="${path}styles.css" rel="stylesheet"/>` : ""}
    ${Boolean(cssString) ? `<style id="jss-server-side">${cssString}</style>` : ""}
</head>
<body>
    <div id="root" class="root">${layout || ""}</div>
</body>
</html>
`
}