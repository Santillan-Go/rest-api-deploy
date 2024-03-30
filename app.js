import express from "express";
import { validateMovie, validatePartialMovie } from "./schemas/schemaMovies.js";
import cors from "cors"
// const movies= require("./movies.json");
const PORT = process.env.PORT ?? 1234;

const movies = [
  {
    id: "dcdd0fad-a94c-4810-8acc-5f108d3b18c3",
    title: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
    duration: 142,
    poster: "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp",
    genre: ["Drama"],
    rate: 9.3,
  },
  {
    id: "c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf",
    title: "The Dark Knight",
    year: 2008,
    director: "Christopher Nolan",
    duration: 152,
    poster: "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg",
    genre: ["Action", "Crime", "Drama"],    
    rate: 9.0,
  },
  {
    id: "5ad1a235-0d9c-410a-b32b-220d91689a08",
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
    duration: 148,
    poster:
      "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Action", "Adventure", "Sci-Fi"],
    rate: 8.8,
  },
  {
    id: "241bf55d-b649-4109-af7c-0e6890ded3fc",
    title: "Pulp Fiction",
    year: 1994,
    director: "Quentin Tarantino",
    duration: 154,
    poster:
      "https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
    genre: ["Crime", "Drama"],
    rate: 8.9,
  },
  {
    id: "9e6106f0-848b-4810-a11a-3d832a5610f9",
    title: "Forrest Gump",
    year: 1994,
    director: "Robert Zemeckis",
    duration: 142,
    poster: "https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg",
    genre: ["Drama", "Romance"],
    rate: 8.8,
  },
  {
    id: "7e3fd5ab-60ff-4ae2-92b6-9597f0308d1",
    title: "Gladiator",
    year: 2000,
    director: "Ridley Scott",
    duration: 155,
    poster: "https://img.fruugo.com/product/0/60/14417600_max.jpg",
    genre: ["Action", "Adventure", "Drama"],
    rate: 8.5,
  },
  {
    id: "c906673b-3948-4402-ac7f-73ac3a9e3105",
    title: "The Matrix",
    year: 1999,
    director: "Lana Wachowski",
    duration: 136,
    poster: "https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg",
    genre: ["Action", "Sci-Fi"],
    rate: 8.7,
  },
  {
    id: "b6e03689-cccd-478e-8565-d92f40813b13",
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    duration: 169,
    poster:
      "https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rate: 8.6,
  },
  {
    id: "aa391090-b938-42eb-b520-86ea0aa3917b",
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    director: "Peter Jackson",
    duration: 201,
    poster: "https://i.ebayimg.com/images/g/0hoAAOSwe7peaMLW/s-l1600.jpg",
    genre: ["Action", "Adventure", "Drama"],
    rate: 8.9,
  },
  {
    id: "2e6900e2-0b48-4fb6-ad48-09c7086e54fe",
    title: "The Lion King",
    year: 1994,
    director: "Roger Allers, Rob Minkoff",
    duration: 88,
    poster:
      "https://m.media-amazon.com/images/I/81BMmrwSFOL._AC_UF1000,1000_QL80_.jpg",
    genre: ["Animation", "Adventure", "Drama"],
    rate: 8.5,
  },
  {
    id: "04986507-b3ed-442c-8ae7-4c5df804f896",
    title: "The Avengers",
    year: 2012,
    director: "Joss Whedon",
    duration: 143,
    poster: "https://img.fruugo.com/product/7/41/14532417_max.jpg",
    genre: ["Action", "Adventure", "Sci-Fi"],
    rate: 8.0,
  },
  {
    id: "7d2832f8-c70a-410e-8963-4c93bf36cc9c",
    title: "Jurassic Park",
    year: 1993,
    director: "Steven Spielberg",
    duration: 127,
    poster:
      "https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024",
    genre: ["Adventure", "Sci-Fi"],
    rate: 8.1,
  },
  {
    id: "ccf36f2e-8566-47f7-912d-9f4647250bc7",
    title: "Titanic",
    year: 1997,
    director: "James Cameron",
    duration: 195,
    poster:
      "https://i.pinimg.com/originals/42/42/65/4242658e6f1b0d6322a4a93e0383108b.png",
    genre: ["Drama", "Romance"],
    rate: 7.8,
  },
  {
    id: "8fb17ae1-bdfe-45e5-a871-4772d7e526b8",
    title: "The Social Network",
    year: 2010,
    director: "David Fincher",
    duration: 120,
    poster:
      "https://i.pinimg.com/originals/7e/37/b9/7e37b994b613e94cba64f307b1983e39.jpg",
    genre: ["Biography", "Drama"],
    rate: 7.7,
  },
  {
    id: "6a360a18-c645-4b47-9a7b-2a71babbf3e0",
    title: "Avatar",
    year: 2009,
    director: "James Cameron",
    duration: 162,
    poster:
      "https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg",
    genre: ["Action", "Adventure", "Fantasy"],
    rate: 7.8,
  },
];
///ORIGENS ACEPTADOS===>
const ACCEPTED_ORINGE=[

  "http://127.0.0.1:5500/",
  "http://santillan-c.dev"
]

const app = express("X-Powered-By:");   

app.use(cors())
//MIDDLEWARE
app.use(express.json());



app.get("/movies", (req, res) => {
  //CUANDO ES EL MISMO ORIGEN NO HAY PROBLEMAS => http://localhost:1234===http://localhost:1234
  //ESTABLECES QUIEN TIENE ACCESO A AL INFO DEL SELECTOR =>* TODOS
  //O CON SOLO EL DOMINIO http://127.0.0.1:5500/
let origin=req.header("origin");

  if(ACCEPTED_ORINGE.includes(origin)|| !origin){
    res.header('Access-Control-Allow-Origin', 'http://santillan-c.dev')
  }

  res.header('Access-Control-Allow-Origin', '*')
  let { genre } = req.query;
  console.log(genre);

  if (genre) {
    let filterMovies = movies.filter((m) => {
      let genreInside = m.genre;
      return (
        genreInside.find((g) => g.toLowerCase() === genre.toLowerCase()) && m
      );
    });

    res.json(filterMovies)
  } else {
    res.json(movies);
  }

  // res.send("<h1> HERE </h1>")
});

app.get("/movies/:id", (req, res) => {
  let id = req.params.id;

  // let moviesJS=JSON.parse(movies);

  let foundMovie = movies.find((m) => m.id == id);
  // let foundMovie=moviesJS.find(m=> m.id===id);

  if (foundMovie) return res.json(foundMovie);

  res.status(404).json({ message: "Not found" });
});

app.post("/movies", (req, res) => {
  let movie = req.body;

  let result = validateMovie(movie);

  if (result.error) {
    res
      .status(400)
      .json(JSON.parse(result.error));
  } else {
    //BASE DE DATOS==>
    let newMovie={...result.data,id:Date.now()}
    movies.push(newMovie);

    res.json({ message: "Se ha agregado tu pelicula" });
  }
});



///ACTUALIZAR CON PATCH


app.patch("/movies/:id",(req, res)=>{


let result=validatePartialMovie(req.body)


if(!result.success) return  res.status(404).json(res.errored.message)


  let {id}=req.params;

  let findIndex=movies.findIndex(m=> m.id===id)

if(findIndex===-1){

  return  res.status(404).json({message:" Not found"})
}

let updateMovie={
  ...movies[findIndex],
  ...result.data

}

movies[findIndex]=updateMovie;
res.json(updateMovie)


})


app.delete("/movies/:id", (req, res)=>{

let id=req.params.id;

let findIndex=movies.findIndex(m=>m.id===id);

if(findIndex===-1){
  res.status(404).json({Message:"No se encontró el recurso"});
}else{
  movies.slice(findIndex,1);
  res.json(movies)
}

})



app.options("/movies/:id",()=>{

const origin=req.header("origin");


res.header("Access-Control-Allow-Origin", origin)
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
})
app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
