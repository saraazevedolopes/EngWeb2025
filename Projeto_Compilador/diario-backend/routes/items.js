  const express = require('express');
  const router = express.Router();
  const Item = require('../controllers/item');
  const Config = require('../controllers/config');
  const auth = require('../auth/auth');
  var multer = require('multer')
  var jsonfile = require('jsonfile');
  var fs = require('fs');
  const AdmZip = require('adm-zip');
  const path = require('path');
  const mime = require('mime-types');
  const Auth = require('../auth/auth')
  const sip = require('../oais/sip')
  const aip = require('../oais/aip')
  const dip = require('../oais/dip')

  var upload = multer({dest : 'uploads'})

  router.get('/',Auth.none, async (req, res) => {
    try {
      let data;

      if (req.query.classificador) {

        if (req.query.publico === 'true') {
          data = await Item.getPublicItemsByClassificador(req.query.classificador);
        } 
        else if (req.query.publico === 'false') {
          data = await Item.getPrivateItemsByClassificador(req.query.classificador);
        } 
        else {
          data = await Item.getAllItemsByClassificador(req.query.classificador);
        }

      }
      else {

        if (req.query.publico === 'true') {
          data = await Item.findPublic();
        } 
        else if (req.query.publico === 'false') {
          data = await Item.findPrivate();
        } 
        else {
          data = await Item.findAll();
        }

      }

      

      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message || err });
    }
  });

  router.get('/classificadores',Auth.none, (req, res) => {
    
    Item.countAllClassificadores()
      .then(data => { res.status(200).json(data) })
      .catch(err => res.status(500).json({ error: err }));

  });

  router.get('/produtor/:id',Auth.none, (req, res) => {
    
    const id = req.params.id

    Item.getItemsProdutor(id)
      .then(data => {

        if (!(req.user && (req.user.perfil === 'administrador' || (req.user.perfil === 'produtor' && req.user._id === id)))) {
          data = data.filter(item => item.publico === true);
        }

        res.status(200).json(data)
        })
      .catch(err => res.status(500).json({ error: err }));
    
  });

  router.get('/config',Auth.none, (req,res) => {

    Config.get()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({ error: err }));

  })

  router.post('/config/add-file-counter',Auth.none, async (req,res) => {

    Config.incrementFilesCounter()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({ error: err }));

  })

  router.get('/:id',Auth.none, (req, res) => {
    Item.findById(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({ error: err }));
  });

  router.post('/', Auth.validateProdutor, (req, res) => {
    Item.save(req.body)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(500).json({ error: err }));
  });

  router.post('/comentario/:id', Auth.none, (req, res) => {

    Item.addComentario(req.params.id, req.body,req.user)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json({ error: err }));

  });

  router.put('/:id', Auth.validateProdutor, async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);

      if(req.user.perfil === "produtor" && item.produtor !== req.user._id) {
        res.status(403).json({error: "Sem permissão para editar o item."})
      }
      else {

        Item.update(req.params.id, req.body)
          .then(data => res.status(200).json(data))
          .catch(err => res.status(500).json({ error: err }));

      }
        
    } catch(err) {
      res.status(500).json({ error: err });
    }
  });

  router.delete('/:id', Auth.validateProdutor, async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);

      if(req.user.perfil === "produtor" && item.produtor !== req.user._id) {
        res.status(403).json({error: "Sem permissão para apagar o item."})
      }
      else {
        Item.delete(req.params.id)
          .then(data => res.status(200).json(data))
          .catch(err => res.status(500).json({ error: err }));
      
      }  
    } catch(err) {
      res.status(500).json({ error: err });
    }
          
  });

  router.get('/download/file/*',Auth.none, async (req, res) => {
    try {
      const relativePath = req.params[0]; 
      const baseDir = path.join(__dirname, '..', 'public/fileStore');
      const filePath = path.join(baseDir, relativePath);


      if (!filePath.startsWith(baseDir)) {
        return res.status(403).json({ error: 'Acesso proibido.' });
      }

      if (fs.existsSync(filePath)) {
        const mimeType = mime.lookup(filePath) || 'application/octet-stream';
        const filename = path.basename(filePath);

        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.status(404).json({ error: 'Ficheiro não encontrado.' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao fazer download do ficheiro.' });
    }
  });

  router.get('/download/:itemId',Auth.none, async (req, res) => {
    try {
      const zipBuffer = await dip.gerarDIP(req.params.itemId);

      res.set({
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="DIP.zip"',
        'Content-Length': zipBuffer.length
      });

      res.send(zipBuffer);
    } catch (err) {
      res.status(500).json({ error: 'Erro ao gerar DIP.' });
    }
  });

  router.post('/files',Auth.validateProdutor ,upload.single('sip') , async (req, res)=> {

    try {

      // #########################
      //           SIP
      // #########################
      
      const zipFolder = sip.guardarZIP(req.file)

      const zipFolderValidado = sip.validaSIP(zipFolder.zip,zipFolder.path)

      
      // #########################
      //           AIP
      // #########################

      const zipName = await aip.arquivarSIP(zipFolderValidado)

      await aip.guardaMetadadosDB(zipFolderValidado,zipName)

      res.status(201).json("Válido")
      
      } catch (err) {
        res.status(500).json({ mensagem: err.message });
      }
      
  });

  module.exports = router;
