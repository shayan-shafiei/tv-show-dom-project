const url = "https://api.tvmaze.com/shows/82/episodes";

const select = document.querySelector("#select-movie");
const container = document.querySelector("#container");
const allOption = document.querySelector("#allOption");
const search = document.querySelector("#search-movie");

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    showImage(data);
    select.addEventListener("change", () => {
      console.log(select.value);
      if(select.value===allOption.value){
          clear();
          showImage(data);
      }else{
      const result = data.filter((el) => el.name === select.value);
      console.log(result[0].summary)
      clear();
      showImage(result);
      }
    });

    search.addEventListener("search",() =>{
        console.log(search.value);
        const result2 = data.filter((el) => el.name.includes(search.value));
        clear();
        showImage(result2);
    })

  });

const clear = () => {
  container.innerHTML = "";
};

const showImage = (data) => {
  for (const movie of data) {
    const div = document.createElement("div");
    div.id="divresult";

    const img = document.createElement("img");
    img.id="imgresult";
    img.src = movie.image.medium;

    const p = document.createElement("p");
    p.id="presult";

    if(movie.number<10){
    p.textContent =  movie.name + " S"+movie.season+" E"+ "0" + movie.number;
    }else{
      p.textContent =
        movie.name + " S" + movie.season + " E" + movie.number;  
    }
    div.append(img,p);

    const option = document.createElement("option");
    option.textContent = movie.name;
    option.value = movie.name;
    select.append(option);

    container.append(div);
    
  }

  console.log(data);
};
