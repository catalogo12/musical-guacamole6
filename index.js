//carpetaBaseDatosJose1
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URL || 'mongodb://mongo:SYgRWOFxbzNyZlISrgInYKrgKJizzXKm@mongodb.railway.internal:27017';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology:true,}).then(()=> console.log('Conexión exitosa a MongoDB')).catch(err => console.error('Error al conectar a MongoDB:', errr));
//const mongoURL = 'mongodb+srv://usuario:

//mongoose.connect('mongodb://127.0.0.1:27017/baseDatosJose1');
const express = require("express");
const app=express();
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 3000
const tablaJose1Schema= new mongoose.Schema({
        id:Number,
        nombre:String,
        existencias:Number
      });
const azul = mongoose.model("azul",tablaJose1Schema);

const bodyParser = require("body-parser");

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//ruta para mostrar formulario para cargar productos
app.get("/productosRuta", (req, res) => {
  res.render("formulario");
});

//ruta para mostrar formulario para eleiminar productos
app.get("/eliminarRuta",(req, res) => {
  res.render("eliminarFormulario");
});

//ruta para mostrar formulario para actualizar datos
app.get("/actualizarRuta",(req, res) => {
  res.render("formularioActualizar");
});



app.use(cors());
app.use(express.json());
app.set('view engine','pug');
app.use(express.urlencoded({ extended: true }));//este codigo te permite leer codigo escrito en js o json
app.use(bodyParser.urlencoded({ extended: true}));//para pasarlo de js json
app.use(bodyParser.json());//para pasarlo de json a js

//Mostrar los datos de la base de datos
app.get("/mostrardb", (req,res) =>{
  azul.find().then((response) =>{
    res.json(response);
  });
});






app.post("/anadirDatos", (req, res) =>{
                                     const productoInfo=req.body;
                                     const nuevoProducto= new azul({
                                     id:productoInfo.id,
                                     nombre:productoInfo.nombre,
                                     existencias:productoInfo.existencias
                                     });
         nuevoProducto.save().then((azul)=>{res.status(200).json(nuevoProducto);
   });
});
                                  
app.post("/eliminacionInterna", (req, res) =>{
                                           const ide=req.body;
                                           console.log("el ide que se registra es:");
                                           console.log(ide);
                                           azul.findOneAndDelete(ide).then((response)=>{res.json({message:"producto con id" + ide + "eliminado"});
  });
});


app.post("/actualizarDatos",async(req, res)=>{
                                             const{id, existencias}=req.body;
                                             try{await azul.updateOne({id},{$set:{existencias}});
                                             res.send('existencias actualizadas correctamente');
                                             }catch (error) {
                                                           res.status(500).send('error al actualizar');
                                                           }
                                              
});

                                        








app.listen(port, () =>{console.log(`leyendo el puerto ${port} ---esta trabajando en carpetaBaseDatosJose1`)});


