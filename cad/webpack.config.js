const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/src/index.jsx', // Entry point for app to start building dependency tree
  output: {
    filename: 'bundle.js', // injects js bundle after compiling all files for export and sends to dist
    path: path.resolve(__dirname, 'client', 'dist'), // Take the current directory where webpack.config.js is then go into the client directory then into dist
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // check for js files
        exclude: /node_modules/,
        use: 'babel-loader', // telling Webpack to use .babelrc to transpile modern JavaScript (ES6+) and JSX into browser-compatible JavaScript.
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // Injects the CSS directly into the DOM by adding <style> tags to the <head>
          'css-loader', // Interprets @import and url() in CSS files, allowing Webpack to bundle CSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i, // Regular expression to match image files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]', // Output file naming convention
              outputPath: 'images', // Output folder for images
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // Inline fonts smaller than 8kb as base64
              name: '[name].[hash].[ext]', // Font file name convention
              outputPath: 'fonts/', // Output directory for fonts
            },
          },
        ],
      },
    ],
  },
  plugins: [ // plugins in Webpack allow you to extend functionality by performing tasks that loaders can’t handle
    new HtmlWebpackPlugin({
      template: './client/src/index.html', // Use this HTML file as the template to copy and place in to the dist folder with the bundle
    }), // The plugin will automatically inject a <script> tag into the dist/index.html file that links to the bundled bundle.js
    new Dotenv(),
  ],
  devServer: { // watches for changes in your files, and automatically refreshes the browser
    static: path.join(__dirname, 'client', 'dist'), // serve content from dist - bundled folder
    port: 8080, // By default its 8080 but you can change this if needed ie --> Express server runs on port 3000 later
    open: true, // Webpack automatically open the browser to http://localhost:8080
    hot: true, // enables live reloading
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
