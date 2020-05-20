let newsList = []
let page = 1;
let keyword = "vietnam"
const apiKey = "9ef7cffc05ce4582aa9a3a62d60fd83e"


const loadNews = async (status) => {
    let url = `https://newsapi.org/v2/everything?q=${keyword}&page=${page}&sortBy=publishedAt&apiKey=${apiKey}`
    let data = await fetch(url)
    let result = await data.json();
    let dataList = result.articles //new

    if (status === 'search') {
        newsList = dataList

    }

    else if (status === 'loadMore') {

        newsList = newsList.concat(dataList) //old

    }

    else if (status === 'firstTime') {
        newsList = dataList

    }

    console.log(result)
    render(newsList)
}

const render = (list) => {

    let newsHtml = list.map(item =>
        `<div id="news">
     <div id="contentsArea">
        <div id="title">${item.title}</div>
        <div id="source">${item.source.name}</div>
        <div id="publishedAt">${getTime(item.publishedAt)}</div>
        <a href="${item.url}"> ==> access article</a>

        
     </div>
     <div id="imgArea">
         <img src="${item.urlToImage}" width=200/>

     </div>
  </div>`).join('')


    document.getElementById("newsArea").innerHTML = newsHtml

}

function getTime(time) {
    let newTime = time.toString().split("").splice(0, 10).join("")
    let newTime1 = newTime.replace("-", "")
    let newTime2 = newTime1.replace("-", "")
    console.log(newTime2)
    return moment(newTime2, "YYYYMMDD").fromNow()
}


let loadMore = () => {
    page++;
    loadNews('loadMore');
};

let research = (e) => {
    e.preventDefault()
    keyword = document.getElementById('keywordArea').value


    console.log("HEY", keyword)
    loadNews('search');

}

const form = document.getElementById('id')
form.addEventListener('submit', research)

loadNews('firstTime');

