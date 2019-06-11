// cannot import another module, or build error

const template = `
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge,chrome=1">
  <meta name="viewport" content="width=device-width, initial-scale=1.0 shrink-to-fit=no">
  <meta name="application-name" content="{{appName}}">
  <meta name="description" content="{{appDescription}}">
  <meta name="author" content="{{appAuthor}}">
  <meta name="keywords" content="{{appKeywords}}">
  <meta name="version" content="{{appVersion}}">
  <meta name="generator" content="dui-cli">
  <meta name="robots" content="follow">
  <title>{{appTitle}}</title>
</head>
<body>
</body>
</html>
`

module.exports = function (data) {
  return template.replace(
    /\{\{(\w+)\}\}/g,
    (match, key) => (data[key] || key)
  )
}
