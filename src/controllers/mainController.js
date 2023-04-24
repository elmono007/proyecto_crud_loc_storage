const express = require('express');
const path = require('path');
const fs = require('fs');

const mainController = {

    home: (req, res) => {

        const filePath = path.resolve(__dirname + '../../../Database/phrases.json');
        const data = fs.readFileSync(filePath, 'utf8');   //Abro el archivo con encoding utf-8    
        let tarjetas = [];

        if (data != '') {
            tarjetas = JSON.parse(data);            //Al ser un texto plano, lo parseo para pasarlo a formato JS
                                                    //Aca ya lo puedo acceder como Array
        }
        
        res.render(path.resolve(__dirname + '/../views/home.ejs'), {
            'tarjetas': tarjetas});

    },

    save: (req, res) => {
        
        const filePath = path.resolve(__dirname + '../../../Database/phrases.json');
        
        //Leemos el contenido del archivo y lo pasamos de formato JSON a JS
        const dataFromFile = fs.readFileSync(filePath);
        let tarjetas = []; 
        let ultimaTarjeta = {};
        let nuevaTarjeta = {};

        if (dataFromFile != '') {

            tarjetas = JSON.parse(dataFromFile);
            ultimaTarjeta = tarjetas[tarjetas.length - 1];        //Leo el ultimo elemento            
            nuevaTarjeta.id = ultimaTarjeta.id + 1;               //Tomo el ultimo id y le sumo 1
                                                                  //No asigno el objeto porque asigno tb. la referencia.
    
        } else {
            nuevaTarjeta.id = 1;
        }
      
        //Cargo datos nueva tarjeta del formulario.
        nuevaTarjeta.Nombre = req.body.Nombre;
        nuevaTarjeta.Apellido =  req.body.Apellido;
        nuevaTarjeta.Frase = req.body.Frase;

        //Al quedar un array, sumamos la nueva tarjeta
        tarjetas.push(nuevaTarjeta);
      
        //Pasamos el contenido array a JSON y grabamos en archivo.
        const dataToFile = JSON.stringify(tarjetas);
        fs.writeFileSync(filePath, dataToFile);
        
        //Luego de grabar vamos al Home
        res.redirect('/');
    },

    borrar: (req, res) => {
        
        const paramId = req.params.id;

        //Leemos el archivo, y lo buscamos dentro del array
        const filePath = path.resolve(__dirname + '../../../Database/phrases.json');
        
        //Leemos el contenido del archivo y lo pasamos de formato JSON a JS
        const dataFromFile = fs.readFileSync(filePath);
        let tarjetas = []; 
        
        if (dataFromFile != '') {
            tarjetas = JSON.parse(dataFromFile);
        }

        const indexFrase = tarjetas.findIndex( (elem) => elem.id == paramId);

        //Sacamos el elemento del indice encontrado
        //const tarjetasModificadas = 
        tarjetas.splice(indexFrase, 1);

        const dataToFile = JSON.stringify(tarjetas);

        fs.writeFileSync(filePath, dataToFile);
      
        //Luego de borrar y grabar el archivo vamos al Home
        res.redirect('/');

    },

    editar: (req, res) => {

        const idTarjeta = req.body.editId;                //Tomamos el id de la tarjeta.

        //Leemos el archivo, y lo buscamos dentro del array
        const filePath = path.resolve(__dirname + '../../../Database/phrases.json');

        //Leemos el contenido del archivo y lo pasamos de formato JSON a JS
        const dataFromFile = fs.readFileSync(filePath);
        let tarjetas = []; 
        
        if (dataFromFile != '') {
            tarjetas = JSON.parse(dataFromFile);
        }

        const indexFrase = tarjetas.findIndex( (elem) => elem.id == idTarjeta);

        //Modificamos con los campos del formulario.
        tarjetas[indexFrase].Nombre = req.body.nombreEdit;
        tarjetas[indexFrase].Apellido = req.body.apellidoEdit;
        tarjetas[indexFrase].Frase = req.body.fraseEdit;
        
        const dataToFile = JSON.stringify(tarjetas);

        fs.writeFileSync(filePath, dataToFile);
      
        //Luego de borrar y grabar el archivo vamos al Home
        res.redirect('/');

    }
}

module.exports = mainController;