const querystring = require('querystring');
const r2 = require('r2');

const DOG_API_URL   = "https://api.thedogapi.com/"
const CAT_API_URL   = "https://api.thecatapi.com/"
const { DOG_API_KEY, CAT_API_KEY, image_channel } = require("./../config.json");

module.exports = {
    name: "image",
    description: "Dog or cat image",
    args: true,
    async execute(message, args) {
        if (message.channel.name != image_channel) return;
        if (args[0] == "dog") {
            var imagesDog = await loadImageDog(message.author.username);
            var imageDog = imagesDog[0];
            await message.channel.send("", {files: [imageDog.url]});
        } else if (args[0] == "cat") {
            var imagesCat = await loadImageCat(message.author.username);
            var imageCat = imagesCat[0];
            await message.channel.send("", {files: [imageCat.url]});
        }
    },
};

async function loadImageDog(sub_id) {
    var headers = {
        'X-API-KEY': DOG_API_KEY,
    }
    var query_params = {
        'has_breeds':true,
        'mime_types':'jpg,png',
        'size':'small',
        'limit' : 1
    }
    let queryString = querystring.stringify(query_params);

    try {
        let _url = DOG_API_URL + `v1/images/search?${queryString}`;
        var response = await r2.get(_url , {headers} ).json
    } catch (e) {
        console.log(e)
    }
    return response;
}

async function loadImageCat(sub_id) {
    var headers = {
        'X-API-KEY': CAT_API_KEY,
    }
    var query_params = {
        'mime_types':'jpg,png',
        'size':'small',
        'limit' : 1
    }
    let queryString = querystring.stringify(query_params);

    try {
        let _url = CAT_API_URL + `v1/images/search?${queryString}`;
        var response = await r2.get(_url , {headers} ).json
    } catch (e) {
        console.log(e)
    }
    return response;
}
