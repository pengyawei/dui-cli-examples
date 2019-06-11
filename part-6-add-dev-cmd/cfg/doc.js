exports.dui = `
  __/\\\\\\\\\\\\\\\\\\\\\\\\____       __/\\\\\\________/\\\\\\_       __/\\\\\\\\\\\\\\\\\\\\\\_
   _\\/\\\\\\////////\\\\\\__       _\\/\\\\\\_______\\/\\\\\\_       _\\/////\\\\\\///__
    _\\/\\\\\\______\\//\\\\\\_       _\\/\\\\\\_______\\/\\\\\\_       _____\\/\\\\\\_____
     _\\/\\\\\\_______\\/\\\\\\_       _\\/\\\\\\_______\\/\\\\\\_       _____\\/\\\\\\_____
      _\\/\\\\\\_______\\/\\\\\\_       _\\/\\\\\\_______\\/\\\\\\_       _____\\/\\\\\\_____
       _\\/\\\\\\_______\\/\\\\\\_       _\\/\\\\\\_______\\/\\\\\\_       _____\\/\\\\\\_____
        _\\/\\\\\\_______/\\\\\\__       _\\//\\\\\\______/\\\\\\__       _____\\/\\\\\\_____
         _\\/\\\\\\\\\\\\\\\\\\\\\\\\/___       __\\///\\\\\\\\\\\\\\\\\\/___       __/\\\\\\\\\\\\\\\\\\\\\\_
          _\\////////////_____       ____\\/////////_____       _\\///////////__

AUTHOR:    yamcer
CREATE:    2018/04/06
LISENCE:   CC-BY-NC-SA-4.0
E-MAIL:    <mailto:yangfan@yamcer.com>
HOMEPAGE:  <https://dui.yamcer.com>
`

exports.duiConfig = `
Examples:

  # generate config file with inquirer
  $ dui config

  # generate config for another dir
  $ dui config -d /path/to/another-dir

  # generate config with specified template
  $ dui config eslintrc-react

  # generate config without checkbox
  $ dui config -s eslintrc-react
`

exports.duiInit = `
Examples:

  # init project with inquirer
  $ dui init

  # init project for another dir
  $ dui init -d /path/to/directory
`

exports.duiDev = `
Examples:

  # dev project
  $ dui dev

  # dev project for another dir
  $ dui init -d /path/to/directory

  # dev project for another port
  $ dui init -p 8080

  # dev project for another host
  $ dui init -h localhost
`

exports.duiLint = `
Examples:

  # lint current folder by eslintrc
  $ dui lint

  # lint current folder with autofix
  $ dui lint -f
  $ dui lint --fix

  # lint for another folder by eslintrc
  $ dui lint -d /path/to/directory

  # lint current folder by another eslintrc
  $ dui lint -c /path/to/.eslintrc

  # lint current folder and save lint log
  $ dui lint -l /path/to/eslint-result.log
`
