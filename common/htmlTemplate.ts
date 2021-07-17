type HTMLTemplateProps = {
    path: string,
    layout?: string,
    title: string,
    description: string
}

export default function htmlTemplate(props: HTMLTemplateProps) {
    const {path, layout, title, description} = props
    return `
<!doctype html>
<html lang="ru">
<head>
    <title>${title}</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="Description" content="${description}"/>
    <script type="text/javascript" async defer src="${path}bundle.js"></script>
    <link href="${path}styles.css" rel="stylesheet"/>
    <style>
        body {
            margin: 0
        }
    </style>
</head>
<body>
    <div id="root" class="root">${layout || ""}</div>
</body>
</html>
`
}