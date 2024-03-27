const express=require("express");
const mysql=require("mysql");
const cors=require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cookie = require('cookie');
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app=express();
const port=8081;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

//create connection
const db = mysql.createConnection(
    {
        host    : 'localhost',
        user    : 'root',
        Password: '123456',
        database : 'trekventures'
       
    }
);

//connect
db.connect((err)=>{
    if (err){
        throw err;
    }
    else{
        console.log("bien connecter")
    }
});


// Création du transporter pour l'envoi d'e-mails
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Utilisez le service Gmail
    auth: {
      user: 'sondes54hakiri@gmail.com', // Remplacez par votre adresse Gmail
      pass: 'tyeaxjfmdwheuazv', // Remplacez par votre mot de passe Gmail
    },
  });
function generateUniqueToken() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const tokenLength = 50;
  let token = '';
  for (let i = 0; i < tokenLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
  }
  return token;
}
// Endpoint pour l'inscription
app.post("/signup", (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const surname = req.body.surname;
    const password = req.body.password;

    
    // Votre requête SELECT pour vérifier si l'utilisateur existe déjà
    const selectSql = "SELECT * FROM users WHERE `email` = ?";
    
  db.query(selectSql, [email], (selectErr, selectData) => {
        if (!selectErr) {
            if (selectData.length <= 0) {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {
                      console.log(err);
                    }
                
   // L'utilisateur n'existe pas, effectuez l'insertion
   const insertSql = "INSERT INTO users (`email`, `name`, `surname`, `password`) VALUES (?, ?, ?, ?)";
   const insertValues = [email, name, surname, hash];

   db.query(insertSql, insertValues, async(insertErr, insertResult) => {
       if (!insertErr) {
          const token = generateUniqueToken();      
          const insertTokenSql = "INSERT INTO confirmation_tokens (`user_id`, `token`) VALUES (?, ?)";
          const userId = insertResult.insertId;
          const insertTokenValues = [userId, token];
  
          db.query(insertTokenSql, insertTokenValues,async (tokenErr, tokenResult) => {
              if (!tokenErr) {
                  // Envoyer l'e-mail de confirmation
                  const mailOptions = {
                    from: 'sondes54hakiri@gmail.com', 
                    to: email,
                    subject: 'Confirmation de Compte',
                    text: `Cliquez sur ce lien pour confirmer votre compte : http://localhost:3000/ConfirmAccount?t=`+token,
                  };
                
                  try {
                    // Envoyez l'e-mail
                    await transporter.sendMail(mailOptions);
                    console.log('E-mail de confirmation envoyé');
                    return res.send({ message: 'Vérifiez votre e-mail pour confirmer votre compte' });
                  } catch (error) {
                    console.error('Erreur lors de l\'envoi de l\'e-mail de confirmation', error);
                    return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
                  }
              } else {
                  console.error('Erreur lors de l\'insertion du token de confirmation', tokenErr);
                  return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
              }
          });
           
          

       } else {
           return res.status(500).json({ message: "Erreur lors de l'inscription" });
       }
   });
   

                });

            } 
            
            else {
                return res.send({ message: "L'email existe déjà" });
            }
        } else {
            return res.status(500).json({ message: "Erreur lors de la requête" });
        }
    });
});

app.get("/login", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });
  
app.post("/login2", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const selectUserSql = "SELECT * FROM users WHERE `email` = ?";
    
    db.query(selectUserSql, email, (err, result) => {
        if (err) {
            res.send({ err: err });
        } else if (result.length > 0) {
            const user = result[0];
            
            bcrypt.compare(password, user.password, (error, response) => {
                if (response) {
                    req.session.user = user;
                    res.cookie("userEmail", email);
                    res.cookie("userid", user.id);
                    res.send(req.session.user);
                    
                    if (user.confirm === 0) {
                        const updateUserSql = "UPDATE users SET `confirm` = 1 WHERE `email` = ?";
                        db.query(updateUserSql, [email], (updateErr, updateResult) => {
                            if (!updateErr) {
                                res.send({ message: "compte confirmé avec succées" });
                            } else {
                                console.log('Erreur lors de la mise à jour du statut de confirmation', updateErr);
                            }
                        });
                    }
                } else {
                    res.send({ message: "Wrong username/password combination!" });
                }
            });
        } else {
            res.send({ message: "User doesn't exist" });
        }
    });
});

  
app.put("/update-profile", (req, res) => {
    const email = req.query.email;
    const name = req.body.name;
    const surname = req.body.surname;
    const phoneNumber = req.body.phoneNumber;

          const updateUserSql = "UPDATE users SET `name` = ?, `surname` = ?,`phoneNumber` = ? WHERE `email` = ?";
          db.query(updateUserSql, [name, surname,phoneNumber, email], (updateUserErr, updateUserResult) => {
              if (!updateUserErr) {
                return res.send({ message: "Données de profil mises à jour avec succès" });
              } 
              else {
                  console.error(updateUserErr);
                  return res.status(500).json({ message: "Erreur lors de la mise à jour des données utilisateur" });
              }
          });
       
    });

app.get('/info', (req, res) => {
    const userEmailCookie = req.headers.cookie; // Obtenez le cookie de l'en-tête de la requête
    const parsedCookies = cookie.parse(userEmailCookie); // Parsez les cookies avec la bibliothèque "cookie"
    const email = parsedCookies.userEmail; // Obtenez l'adresse e-mail stockée dans le cookie
    if (!email) {
        return res.status(400).json({ message: "L'email n'est pas disponible dans les cookies" });
      }
  
    let firstQuery = "SELECT `id`, `email`, `name`, `surname`,`phoneNumber` FROM users WHERE `email` = ?";
    db.query(firstQuery, [email], (err, userData) => {
      if (err) {
        
        return res.status(500).json({ message: "Erreur lors de la requête 1"});
        
      }
  
      if (userData.length === 0) {
        return res.send({ message: "L'email n'existe pas" });
      }
  
        return res.send(userData[0]);
      });
    });


app.post("/pass", (req, res) => {
        const email = req.body.email; 
        const selectQuery = "SELECT * FROM users WHERE `email`=?";
        
        db.query(selectQuery, [email], async (err, result) => { 
          if (!err) { 
            if (result.length <= 0) {
              return res.send({ message: "L'adresse e-mail n'existe pas" });
            } else {
                    const userId = result[0].id;
                    const token = generateUniqueToken();      
                    const insertTokenSql = "INSERT INTO resetpass_tokens (`idUser`, `tokenReset`) VALUES (?, ?)";
                    
                    const insertTokenValues = [userId, token];
            
                    db.query(insertTokenSql, insertTokenValues,async (tokenErr, tokenResult) => {
                        if (!tokenErr) {
                            // Envoyer l'e-mail de confirmation
                            const mailOptions = {
                              from: 'sondes54hakiri@gmail.com', 
                              to: email,
                              subject: 'Eeset Password',
                              text: `Cliquez sur ce lien pour Rénitialiser votre mot de passe : http://localhost:3000/ResetPassword?t=`+token,
                            };
                          
                            try {
                              // Envoyez l'e-mail
                              await transporter.sendMail(mailOptions);
                              console.log('E-mail de confirmation envoyé');
                              return res.send({ message: 'Vérifiez votre e-mail pour confirmer votre Nouveau mot de pass' });
                            } 
                            catch (error) {
                              console.error('Erreur lors de l\'envoi de l\'e-mail de confirmation', error);
                              return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
                            }
                        } else {
                            console.error('Erreur lors de l\'insertion du token de confirmation', tokenErr);
                            return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
                        }
                    });
                     
                    
          
                 }
            
          } else { // Correction : en cas d'erreur
            console.error("Erreur lors de la requête SQL", err); // Utilisation de err ici
            res.status(500).json({ message: "Erreur lors de la réinitialisation du mot de passe" });
          }
        });

    });
  
app.post('/reset-password/:token', async (req, res) => {
        const token = req.params.token;
        const { email, password } = req.body; 
        const selectTokenSql = "SELECT * FROM resetpass_tokens WHERE `tokenReset` = ?";
        db.query(selectTokenSql, [token], async(selectTokenErr, selectTokenData) => {
          if (selectTokenErr) {
            console.error('Erreur lors de la vérification du token de confirmation', selectTokenErr);
            return res.status(500).send('Erreur lors de la confirmation du compte');
          }
          
          if (selectTokenData.length === 0) {
            console.error('Token de password invalide ou expiré');
            return res.status(400).send('Le lien de confirmation est invalide ou expiré.');
          }
          
          const userId = selectTokenData[0].idUser;

          const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';
      
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          db.query(updateQuery, [hashedPassword, userId], (err, results) => {
            if (err) {
              console.error('Erreur lors de la requête SQL', err);
              return res.status(500).json({ message: 'Une erreur s\'est produite lors de la réinitialisation du mot de passe.' });
            }
      
            const mailOptions = {
              from: 'sondes54hakiri@gmail.com',
              to: email,
              subject: 'Réinitialisation de mot de passe réussie',
              text: `Votre mot de passe a été réinitialisé avec succès. Connectez-vous avec votre nouveau mot de passe :http://localhost:3000/Connecter?t=`+token
            };
      
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error('Erreur lors de l\'envoi de l\'e-mail', error);
              } else {
                console.log('E-mail envoyé', info.response);
              }
            });
      
            return res.json({ message: 'Mot de passe réinitialisé avec succès. Vérifiez votre e-mail pour les instructions de connexion.' });
          });
        } catch (error) {
          console.error('Erreur lors du hachage du mot de passe', error);
          return res.status(500).json({ message: 'Une erreur s\'est produite lors de la réinitialisation du mot de passe.' });
        }
      

        })



        
    
    
    
    });


    app.get('/confirm/:token', (req, res) => {
        const token = req.params.token;
        const selectTokenSql = "SELECT * FROM confirmation_tokens WHERE `token` = ?";
        
        db.query(selectTokenSql, [token], (selectTokenErr, selectTokenData) => {
          if (selectTokenErr) {
            console.error('Erreur lors de la vérification du token de confirmation', selectTokenErr);
            return res.status(500).send('Erreur lors de la confirmation du compte');
          }
          
          if (selectTokenData.length === 0) {
            console.error('Token de confirmation invalide ou expiré');
            return res.status(400).send('Le lien de confirmation est invalide ou expiré.');
          }
          
          const userId = selectTokenData[0].user_id;
          const updateUserSql = "UPDATE users SET `confirm` = 1 WHERE `id` = ?";
          
          db.query(updateUserSql, [userId], (updateErr, updateResult) => {
            if (updateErr) {
              console.error('Erreur lors de la mise à jour du statut de confirmation', updateErr);
              return res.status(500).send('Erreur lors de la confirmation du compte');
            }
            return res.status(200).send('Confirmation réussie');
          });
        });
      });
            

app.listen(port,()=>{
    console.log(`App listening on port ${port} !`)
})