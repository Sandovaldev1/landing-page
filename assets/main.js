//Creamos una conexion API para mostrar los videos//
//Creamos una constante API con la url del canal de youtube//

const API = "https://youtube-v31.p.rapidapi.com/search?channelId=UCsMica-v34Irf9KVTh6xx-g&part=snippet%2Cid&order=date&maxResults=50";


const content = null || document.getElementById('content');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5123bf7352msh8ed8b9eb4c89b1cp1f1a5cjsnf2de6992211c',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

//Creamos una funcion asincrona que recibe como parametro una url API
async function fetchData(urlApi){
    const response = await fetch(urlApi, options);
    //transformamos la informacion para que sea visible
    const data = await response.json();
    //retornamos los datos
    return data;
}


// Con esta funcion hacemos el llamado a la API, obtenemos los elementos y se muestra en nuestro html
(async () => {
    try{
        const videos = await fetchData(API);
        let view = `
        ${videos.items.map(video => `
        <a href="https://youtube.com/watch?v=${video.id.videoId}"target="_blank">
        <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${video.snippet.title} |
            ${video.snippet.channelTitle}
          </h3>
        </div>
      </div>
    `).slice(0,8).join('')}

    `;
    content.innerHTML = view;
    }
    catch (error){
        console.log(error);
    }
})();

