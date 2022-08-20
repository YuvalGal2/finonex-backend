module.exports = function(app,axios) {
    app.get('/api/photos', async (req, res) => {
       res.send(await getAllPhotos());
    })

    app.get('/api/album/:id', async (req, res) => {
        res.send( await getImagesByAlbumId(req.params.id));
    })

    async function getImagesByAlbumId(albumId) {
        const allPhotos = Array.from(await getAllPhotos());
        const filteredData = allPhotos.filter((photo) => photo.albumId === Number(albumId));
         return JSON.stringify(filteredData);
    }

    async function getAllPhotos() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
        return response.data;
    }
}
