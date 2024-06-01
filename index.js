const express = require('express');
const app = express();
const {createClient} = require('@supabase/supabase-js')
const cors = require('cors');
const spankbang = require('spankbang');

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

//get spankbang data
app.get('/spankbang',async(req,res)=>{
    const fresh = await spankbang.videos.fresh();
    res.json(fresh);
})

//get spankbang data by categories
app.get('/spankbang/:cate',async(req,res)=>{
    let cate = req.params.cate;
    let page = req.query.page;
    let category = req.query.category;
    let url = req.query.url;
    if(cate == 'trending'){
        const fresh = await spankbang.videos.sections.trending({page});
        res.json(fresh);
    }else if(cate == 'upcoming'){
        const fresh = await spankbang.videos.sections.upcoming({page});
        res.json(fresh);
    }else if(cate == 'new'){
        const fresh = await spankbang.videos.sections.newVideos({page});
        res.json(fresh);
    }else if(cate == 'popular'){
        const fresh = await spankbang.videos.sections.popular({page});
        res.json(fresh);
    }else if(cate == 'video'){
        const details = await spankbang.videos.details({url});
        res.json(details);
    }else if(cate == 'pornstars'){
        const stars = await spankbang.pstars({page});
        res.json(stars);
    }else if(cate == 'channels'){
        if(category == 'hot'){
            const data = await spankbang.channels.hot();
            res.json(data);
        }else if(category == 'new'){
            const data = await spankbang.channels.newChannels();
            res.json(data);
        }else if(category == 'popular'){
            const data = await spankbang.channels.popular();
            res.json(data);
        }else if(category == 'name'){
            const data = await spankbang.channels.name();
            res.json(data);
        }
    }
})

app.listen(80,()=>{
    console.log('Server started with port 80');
})