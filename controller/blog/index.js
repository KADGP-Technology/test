const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

exports.getAllblog = (req, res) => {
    const response_data = []
    axios.get('https://www.googleapis.com/blogger/v3/blogs/3280937189833481067/posts?key=AIzaSyAsF6SsJtn09ZWtXoHKIOhZqY5jvraPH-Q')
            .then(function (response) {
                for(var i = 0; i<response.data.items.length; i++){
                    let obj = {}
                    var api_res = response.data.items[i]
                    if(api_res.content) {
                      const dom = new JSDOM(`${api_res.content}`);
                      let Image = dom.window.document.querySelector("img").src;
                      if(Image){
                      obj["image"] = Image
                      obj["content"] = api_res.content
                    if(api_res.id) obj["blogId"] = api_res.id
                    if(api_res.published) obj["published"] = api_res.published.slice(0,10)
                    if(api_res.title) obj["title"] = api_res.title
                   
                    if(api_res.author.displayName) obj["author_name"] = api_res.author.displayName
                    if(api_res.author.image.url) obj["author_image"] = "https:"+api_res.author.image.url
                    response_data.push(obj)
                } }
              }
    res.send(response_data)
  })
  .catch(function (error) {
    console.log(error);
  })}


exports.getDetails = (req, res) => {
  axios.get('https://www.googleapis.com/blogger/v3/blogs/3280937189833481067/posts/'+req.params.id+'?key=AIzaSyAsF6SsJtn09ZWtXoHKIOhZqY5jvraPH-Q')
  .then(function (response) {
if(response.data){
  let query = response.data.title.split(/\s+/).slice(0, 1).join(" ");
  axios.get('https://www.googleapis.com/blogger/v3/blogs/3280937189833481067/posts/search?q='+query+'&key=AIzaSyAsF6SsJtn09ZWtXoHKIOhZqY5jvraPH-Q')
  .then(function (queryResponse){
    const keepReading = [];
    for(let i = 0; i<queryResponse.data.items.length; i++){
      var api_res = queryResponse.data.items[i]
         obj = {}
         obj["title"] = api_res.title;
         obj["blogId"] = api_res.id;
         keepReading.push(obj)
    }
    res.send({"content" : response.data.content,
    "title" : response.data.title,
    "author_name" : response.data.author.displayName,
    "date" : response.data.published.slice(0,10),
    "keepReadingData" : keepReading
});
  })}
  })
  .catch(function (error) {
    console.log(error);
  });
}
