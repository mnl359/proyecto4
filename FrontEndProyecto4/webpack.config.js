var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue?$/,
                exclude: /(node_modules)/,
                use: 'vue-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
              },
              {
                test: /\.(png|eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
              }        
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true,
        inline:true,
        port: 8080,
	allowedHosts: [
		'.amazonaws.com'
	]
    },
    externals: {
        // global app config object
        config: JSON.stringify({
	    apiUrl: 'http://ec2-3-14-11-88.us-east-2.compute.amazonaws.com:3000'
        })
    }
}
