const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
								'@primary-color': '#006cc9',
								'@layout-body-background': '#f0f2f5',
								'@layout-header-background': '#02447c',
								'@layout-header-height': '16px',
								'@layout-trigger-background': '#0058a3',
								'@menu-bg': '@layout-header-background',
								'@menu-item-color': 'white',
							},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};