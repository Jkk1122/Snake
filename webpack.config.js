// 引入一个包
const path = require('path')
// 引入html文件
const HTMLWebpackPlugin = require('html-webpack-plugin');

// 引入clean插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// webpack的配置文件都写在module.exports中
module.exports = {

    // 指定入口文件
    entry:"./src/index.ts",

    // 指定打包后文件所在目录
    output:{
        // 指定打包文件的目录
        path:path.resolve(__dirname,'dist'),
        // 打包后的文件
        filename:"bundle.js",
        // 告诉webpack不使用箭头函数
        environment:{
            arrowFunction:false
        }
    },

    // 指定webpack打包时要用的模块
    module:{
        // 指定要加载的规则
        rules:[
            {
                // test是指的规则生效的文件
                test:/\.ts$/,
                // 要使用的loader   加载多loader，写在后面先执行，先转化ts，再进行babel加载
                use:[
                    // 配置babel
                    {
                        // 指定加载器
                        loader:"babel-loader",
                        // 设置babel
                        options:{
                            // 设置预定义环境
                            presets:[
                                [
                                    // 指定环境插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets:{
                                            "chrome":"88"
                                        },
                                        // 指定codejs的版本
                                        "corejs":"3",
                                        //使用codejs的方式“usage”表示按需加载
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader',
                ],
                // 要排除的文件
                exclude:/node_modules/
            },
            // 设置less文件的处理
            {
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    // 引入postcss
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ],
    },
    mode:"production",

    // 配置html插件
    plugins:[
        new CleanWebpackPlugin(),
        new  HTMLWebpackPlugin({
            // title:'hahah'
            // 按照模板生成html文件
            template:'./src/index.html'
        }),
    ],

    // 用来设置引用模块
    resolve:{
        extensions:['.ts','.js']
    }
}