const fs = require("fs");

const encodingFile= "utf-8"



class Contenedor {
  constructor(nombre) {
    this.nombre = nombre;
  }
    save(obj) {
      try {
        let siExiste = this.getAll();
        if (typeof siExiste == "objet") {
          siExiste.length > 0
            ? (obj.id = siExiste[siExiste.length - 1].id + 1)
            : (obj.id = 1);
          siExiste.push(obj);
          fs.writeFileSync(`./${this.nombre}`, JSON.stringify(siExiste));
          return obj.id;
        } else {
          obj.id = 1;
          fs.writeFileSync(`./${this.nombre}`, JSON.stringify([obj]));
          return obj.id;
        }
      } catch (e) {
        console.log(e);
      }
    }

    getById(id){

      try{
  
          const productos = this.getAll()
  
              if(typeof productos == "object"){
  
                  if(typeof id === "number" && id <= productos.length && id > 0 ) return productos.find(el=> el.id === id)
  
              return `El id: ${id} es inválido.`
  
              }else{
  
                  return `No existe el archivo ${this.nombre}.`
              }
  
          }
  
      catch(e){
  
      return e
      }
  } 
    
  
  
  getAll() {
    // devuelve un array con los obj presentes en el archivo

    if (fs.existsSync(`./${this.nombre}`)) {
      let info = fs.readFileSync(`./${this.nombre}`, encodingFile);

      let archivoProducto = JSON.parse(info);

      return archivoProducto;
    } else {
      return `No existe el archivo ${this.nombre}`;
    }
  }
  
      //Elimina del archivo el objeto con el id buscado
  
  deleteById(id){


    
        const productos = this.getAll()
    
            if(typeof productos == "object"){
    
            if(typeof id === "number" && id <= productos.length && id > 0 ) {
    
                const newInfo= productos.filter(el=> el.id !==id)
    
                if(newInfo.length < productos.length){
    
            fs.writeFileSync( `./${this.nombre}`, JSON.stringify(newInfo))
    
            return `El Id ${id} fue eliminado`
    
            }
    
            return `El Id ${id} ya fue eliminado`
    
            }else{
    
                return `El Id ${id} es inválido`
            }
        }else return productos
    
    }

    deleteAll(){

      // Elimina todos los objetos presentes en el archivo.
      
      fs.writeFileSync( `./${this.nombre}`, JSON.stringify([]))
      
      return `Todos los objetos del archivo ‘${this.nombre}’ fueron eliminados`
      
      }   


}





module.exports= Contenedor
