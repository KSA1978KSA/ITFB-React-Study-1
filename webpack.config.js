const path = require('path');

    module.exports = {
      entry: './src/index.tsx',    
      mode: 'development',    
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'result.js',
      },    
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
      },    
      devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
      },      
      module: {
        rules: [
          {
            test: /.tsx?$/,
            loader: 'ts-loader',
          },
          {
            test: /.svg$/,
            exclude: /node_modules/,
            loader: 'file-loader'
          },
          { 
            test: /.css$/, 
            exclude: /node_modules/,
            use: ["style-loader", "css-loader"]
          }  
        ]
      }  
    };
