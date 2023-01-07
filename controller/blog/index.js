const axios = require('axios');
var Meta = require('html-metadata-parser');

exports.getAllblog = (req, res) => {
    const response_data = []
    axios.get('https://www.googleapis.com/blogger/v3/blogs/3280937189833481067/posts?key=AIzaSyAkCqqg6Okrk8b2fNfWFR5m2V25PQAqSoQ')
            .then(function (response) {
                for(var i = 0; i<response.data.items.length; i++){
                    let obj = {}
                    var api_res = response.data.items[i]
                    if(api_res.blog.id) obj["blogId"] = api_res.blog.id
                    if(api_res.published) obj["published"] = api_res.published.slice(0,10)
                    if(api_res.title) obj["title"] = api_res.title
                    if(api_res.content) {
                    var myRegex = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
                    var result = myRegex.exec(api_res.content)
                    if(result)
                    obj["image"] = result[1]
                }
                    if(api_res.author.displayName) obj["author_name"] = api_res.author.displayName
                    if(api_res.author.image.url) obj["author_image"] = "https:"+api_res.author.image.url
                    response_data.push(obj)
                }
    res.send(response_data)
  })
  .catch(function (error) {
    console.log(error);
  })

}