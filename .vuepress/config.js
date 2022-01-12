// const sidebar = require('./siderbar.js');
module.exports = {
    title: '刘',
    description: 'liu',
    base: '/',
    head: [
        [
            'link',
            {
                rel: 'icon',
                href: '/a.png',
            },
        ],
        [
            'meta',
            {
                name: 'viewport',
                content: 'width=device-width,initial-scale=1,user-scalable=no',
            },
        ],
    ],
    plugins: [
        '@vuepress-reco/vuepress-plugin-comments',
        'vuepress-plugin-meting', ['vuepress-plugin-awesome-musicplayer'],
    ],
    theme: 'reco',
    themeConfig: {
        mode: 'light',
        subSidebar: 'auto',
        valineConfig: {
            appId: 'J5tjg07ntXRA77YOLWeXE84F-gzGzoHsz',
            appKey: 'KmtIr2YQTbtN3F3lyIpAThFm',
        },
        nav: [{
                text: '主页',
                link: '/',
                icon: 'reco-home',
            },
            {
                text: '时间线',
                link: '/timeline/',
                icon: 'reco-date',
            },
            {
                text: '音乐',
                link: '/blogs/musics/chooseMusic.html',
                icon: 'reco-other',
            },
            {
                text: '留言板',
                link: '/blogs/views/messageBoard.html',
                icon: 'reco-suggestion',
            },
            {
                text: 'Contact',
                icon: 'reco-message',
                items: [{
                    text: 'GitHub',
                    link: 'https://github.com/wangxiaoer5200',
                    icon: 'reco-github',
                }, ],
            },
        ],
        // sidebar,
        type: 'blog',
        blogConfig: {
            category: {
                location: 2,
                text: '目录索引',
            },
            tag: {
                location: 3,
                text: '标签索引',
            },
        },
        friendLink: [{
            title: 'vuepress-theme-reco',
            desc: 'A simple and beautiful vuepress Blog & Doc theme.',
            avatar: 'https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png',
            link: 'https://vuepress-theme-reco.recoluan.com',
        }, ],
        logo: '/a.png',
        search: true,
        searchMaxSuggestions: 10,
        lastUpdated: 'Last Updated',
        author: 'lzq',
        authorAvatar: '/a.png',
        record: '首页',
        startYear: '2022',
    },
    markdown: {
        lineNumbers: true,
    },
}