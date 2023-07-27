const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dsvekogfv', 
    api_key: '411651133551995', 
    api_secret: 'FORZp8AsUA3uOLoCH7yBz39sSuw',
    secure: true
  });

  module.exports=cloudinary;
 