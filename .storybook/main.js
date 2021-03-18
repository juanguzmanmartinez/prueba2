module.exports = {
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-docs",
        {
            name: '@storybook/addon-essentials',
            options: {
                actions: false,
                toolbars: false,
                controls: false,
            }
        }
    ]
}
