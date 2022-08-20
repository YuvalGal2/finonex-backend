module.exports = function(app,axios,cache){
    const postsCachePeriod = 10000;
    app.get('/api/posts', async (req,res) => {
        const allPosts = cache.get('allPosts');
        if (allPosts !== undefined) {
            res.send(allPosts);
        }
        else {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            cache.set(`allPosts`, response.data, postsCachePeriod);
            res.send(response.data);
        }
    })

}
