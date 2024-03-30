import z from "zod"


// INVESTIRGAR MAS DE ZOD


//ESQUEMA DE VALIDACIONES DE PROPIEDADES
 const movieScheme=z.object({
    title:z.string({
        invalid_type_error:"Movie title Must be a string",
        required_error:"Movie is required"
   } )
,
   genre:z.number().int().min(1900).max(2025),
   director:z.string(),
   duration:z.number().int().positive(),
   rate:z.number().min(0).max(10),
   poster:z.string().url({
    message:"IMAGE MUST BE A URL"
   })
   ,
   genre:z.array(
z.enum(["Action", "Adventure", "Sci-Fi","Biography","Fantasy","Drama"])

   )
})


//   SAFEPARSE RECIBE UN OBJ PARA PASARSELO A MOVIESHEME, LA  CUAL RETORNA
//  SUCCESS, DATA, ERROR, ESTO A MANERA DE OBJETO=>{SUCCESS, ERR, DATA}
export function validateMovie(object){


return  movieScheme.safeParse(object)


}


export  function validatePartialMovie(object){

   //PARTIAL HACE QUE TODAS LA PROPIEDADES DEL ESQUEMA SEAN OPCIONALES
return movieScheme.partial().safeParse(object)


}