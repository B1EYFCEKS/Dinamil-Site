// server.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Resim yükleme klasörünü ve dosya adını ayarla
const storage = multer.diskStorage({
  destination: '/app/(dashboard)/admin/Kategori/page.tsx',
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Uploads klasörünü statik olarak sun
app.use('/images', express.static('uploads'));

// Resim yükleme endpoint'i
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Dosya yüklenemedi.');
  }
  
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

app.listen(5000, () => {
  console.log('Server 5000 portunda çalışıyor');
});