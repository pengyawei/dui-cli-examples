// path中的变量:
// {{cwd}} 当前命令行工作目录
// {{urd}} 当前用户的根目录
// {{prd}} 本项目的根目录

// origin类型：
// remote 远端, location 本地

module.exports = {
  config: {
    templates: [
      {
        name: 'eslintrc-node',
        tasks: [
          {
            origin: 'location',
            input: '{{prd}}/tmp/configs/eslintrc.node.json',
            output: '{{cwd}}/.eslintrc',
          },
        ],
      },
      {
        name: 'eslintrc-react',
        tasks: [
          {
            origin: 'location',
            input: '{{prd}}/tmp/configs/eslintrc.react.json',
            output: '{{cwd}}/.eslintrc',
          },
        ],
      },
      {
        name: 'eslintrc-vue',
        tasks: [
          {
            origin: 'location',
            input: '{{prd}}/tmp/configs/eslintrc.vue.json',
            output: '{{cwd}}/.eslintrc',
          },
        ],
      },
      {
        name: 'git-ignore',
        tasks: [
          {
            origin: 'location',
            input: '{{prd}}/tmp/configs/git.ignore.conf',
            output: '{{cwd}}/.gitignore',
          },
        ],
      },
      {
        name: 'npm-ignore',
        tasks: [
          {
            origin: 'location',
            input: '{{prd}}/tmp/configs/npm.ignore.conf',
            output: '{{cwd}}/.npmignore',
          },
        ],
      }
    ],
  }
}
