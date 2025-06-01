const jwt = require('jsonwebtoken');

const SECRET = "EngWeb2025";

module.exports.none = (req, res, next) => {

  try {
    const payload = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    req.user = payload;
  } catch (err) {}

  next();
}

module.exports.validate = (req, res, next) => {

  const token = req.cookies.token;

  console.log("TOKEN",token)

  if (!token) return res.status(401).json({ error: 'Token em falta' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}

module.exports.validateProdutor = (req, res, next) => {

  const token = req.cookies.token;

  console.log("TOKEN PRODUTOR",token)

  if (!token) return res.status(401).json({ error: 'Token em falta' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (payload.perfil === "produtor" || payload.perfil === "administrador") {
      req.user = payload;
      next();
    }
    else {
      res.status(403).jsonp({ error: "Apenas produtores ou administradores podem aceder." });
    }

  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}

module.exports.validateAdmin = (req, res, next) => {

  const token = req.cookies.token;

  console.log("TOKEN ADMIN",token)

  if (!token) return res.status(401).json({ error: 'Token em falta' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (payload.perfil === "administrador") {
        req.user = payload;
        next();
    } else {
      res.status(403).jsonp({ error: "Apenas administradores podem aceder." });
    }
  } catch(err) {
    res.status(403).jsonp({ error: "Apenas administradores podem aceder." });
  }
}