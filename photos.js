module.exports = function(app,axios,cache) {
    const cachePhotosPeriod = 10000;
    app.get('/api/photos', async (req, res) => {
        const photos = cache.get('allPhotos');
        if (photos !== undefined) {
            res.send(photos);
        }
        else {
            const allPhotos = await getAllPhotos();
            cache.set( "allPhotos", allPhotos, cachePhotosPeriod );
            res.send(allPhotos);
        }
    })

    app.get('/api/album/:id', async (req, res) => {
        const album = cache.get(`album${req.params.id}`);
        if (album !== undefined) {
            return album;
        }
        const albumById = await getImagesByAlbumId(req.params.id);
        cache.set(`album${req.params.id}`, albumById, cachePhotosPeriod);
        res.send(albumById);
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
