const express = require('express');
const app = express();
const {createClient} = require('@supabase/supabase-js')
const cors = require('cors');
const xvideos = require('xvideosx');

const supabase = createClient('https://walwibbnedmfzzhqtuqz.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhbHdpYmJuZWRtZnp6aHF0dXF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAzNjgxMDUsImV4cCI6MjAxNTk0NDEwNX0.c0CCF50vux3GKvR70ONdZ4E-yjfLu_vgazK0k-LZyN0');

app.use(cors({
    origin:'*'
}));

app.get('/',(req,res)=>{
    res.send('Home')
})

//get all images
app.get('/img',async(req,res)=>{
    let cate = req.query.category;
    if(cate){
        const {data,error} = await supabase.from('imglist').select('*').eq('cate',cate);
        if(data){
            res.json(data);
        }else{
            res.status(404).send("Error")
        }
    }else{
        const {data,error} = await supabase.from('imglist').select('*');
        if(data){
            res.json(data);
        }else{
            res.status(404).send("Error")
        }
    }
})

//get image by category
app.get('/img',async(req,res)=>{
    let cate = req.query.category;
    const {data,error} = await supabase.from('imglist').select('*');
    if(data){
        res.json(data);
    }else{
        res.status(404).send("Error")
    }
})

//get specific image
app.get('/img/:id',async(req,res)=>{
    let id = req.params.id;
    const {data,error} = await supabase.from('imglist').select().eq('imgid',id);
    if(data){
        res.json(data);
    }else{
        res.status(404).send("Error")
    }
})

//get xvideo api data
app.get('/xvideo',async(req,res)=>{
    let page = req.query.page;
    const fresh = await xvideos.videos.fresh({page:page});
    res.json(fresh);
    console.log(fresh);
})

//get xvideo by params api data
app.get('/xvideo/:type',async(req,res)=>{
    let page = req.query.page;
    let type = req.params.type;
    let url = req.query.url;
    if(type == 'new'){
        const fresh = await xvideos.videos.newFresh({page:page});
        res.json(fresh);
    }else if (type == 'video') {
        const fresh = await xvideos.videos.details({url});
        res.json(fresh);
    }
    
})

app.listen(80,()=>{
    console.log('Server started with port 80');
})